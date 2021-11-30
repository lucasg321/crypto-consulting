from django.template.loader import render_to_string
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import HttpResponse
from accounts.models import CustomUser, Consultant
from accounts.serializers import RegisterSerializer, ConsultantSerializer
from django.http import JsonResponse, HttpResponse
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from django.contrib import messages
from accounts.forms import SendEmailForm
from django.conf import settings
from core.utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import requests
import jwt


class SSORegisterLoginView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        if request.user is not None:
            sso_jwt_refresh = RefreshToken.for_user(request.user)
            sso_jwt_access = sso_jwt_refresh.access_token
            data = {'success': 'true', 'access': str(sso_jwt_access), 'email': str(request.user.email), 'refresh': str(sso_jwt_refresh), 'url': settings.ANGULAR_URL}
            html = render_to_string(template_name='sso-post-login.html', context=data, request=request)
            return HttpResponse(html)
            # return Response(data, status=status.HTTP_201_CREATED)
        else:
            error = 'Error: No user is signed into the session!'
            return Response({'success': 'false', 'msg': error}, status=status.HTTP_204_NO_CONTENT)


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class UserView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        email = request.data.get('email')

        try:
            con = Consultant.objects.get(email=email)
        except:
            try:
                user = CustomUser.objects.get(email=email)
                con = None
            except:
                return Response({"Error": "User with that email not found"}, status=status.HTTP_404_NOT_FOUND)

        if con is not None:
            data = {
                "first_name": con.first_name,
                "last_name": con.last_name,
                "email": con.email,
                "date_joined": con.date_joined,
                "expertise": con.expertise,
                "description": con.description,
                "calendly_id": con.calendly_id,

            }
        else:
            data = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "date_joined": user.date_joined,
            }

        return Response(data, status=status.HTTP_201_CREATED)

    def patch(self, request):
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        expertise = request.data.get('expertise')
        description = request.data.get('description')
        # calendly_id = request.data.get('calendly_id')
        tags = request.data.get('tags')
        profile_pic = request.data.get('profile_pic')

        try:
            con = Consultant.objects.get(email=email)
        except:
            try:
                user = CustomUser.objects.get(email=email)
                con = None
            except:
                return Response({"Error": "User with that email not found"}, status=status.HTTP_404_NOT_FOUND)

        if con is not None:
            if first_name is not None:
                con.first_name = first_name
            if last_name is not None:
                con.last_name = last_name
            if expertise is not None:
                con.expertise = expertise
            if description is not None:
                con.description = description
            if tags is not None:
                con.tags = tags
            if description is not None:
                con.profile_pic = profile_pic
            # if calendly_id is not None:
            #     con.calendly_id = calendly_id
            con.save()
            data = {
                "first_name": con.first_name,
                "last_name": con.last_name,
                "email": con.email,
                "date_joined": con.date_joined,
                "expertise": con.expertise,
                "description": con.description,
                "calendly_id": con.calendly_id,

            }
        else:
            if first_name is not None:
                user.first_name = first_name
            if last_name is not None:
                user.last_name = last_name
            user.save()
            data = {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "date_joined": user.date_joined,
            }

        return Response(data, status=status.HTTP_201_CREATED)


class ConsultantView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        queryset = Consultant.objects.all()
        serializer_class = ConsultantSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_201_CREATED)


class SendNewsletter(FormView):
    template_name = 'custom-email.html'
    form_class = SendEmailForm
    success_url = reverse_lazy('admin:accounts_customuser_changelist')

    def form_valid(self, form):
        if self.request.user.is_superuser:
            users = form.cleaned_data['users']
            message = form.cleaned_data['message']

            MAILGUN_API_KEY = "8e43b732a2ecbab4c186738d032e6caf-6e0fd3a4-6fe445f9"
            MAILGUN_DOMAIN = "newearthsolutions.ca"
            API_BASE_URL = 'https://api.mailgun.net/v3/' + MAILGUN_DOMAIN + '/messages'
            SENDER_EMAIL = 'Cryptocon <mailgun@' + MAILGUN_DOMAIN + '>'

            for user in users:
                # TODO: Create Mailgun account and template, fill in Mailgun account credentials (ensure variables work)
                response = requests.post(
                    API_BASE_URL,
                    auth=("api", MAILGUN_API_KEY),
                    data={"from": SENDER_EMAIL,
                          "to": user.email,
                          "subject": "Newsletter",
                          "template": "newsletter",
                          "h:X-Mailgun-Variables": '{"Name": "' + user.first_name + '"}, {"Message": "' + message + '"}'})

            messages.success(self.request, "Successfully sent a custom Newsletter to selected users.")

            return super(SendNewsletter, self).form_valid(form)
        else:
            return HttpResponse("Not an Admin or Staff, you cannot send a custom Newsletter.")


class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = CustomUser.objects.get(id=payload['user_id'])

            if not user.is_active:
                user.is_active = True
                user.save()

            return HttpResponse('Successfully activated your Cryptocon account. Click <a href="https://localhost:4200/login/">here</a> to login.')

        except jwt.ExpiredSignatureError as identifier:
            token = RefreshToken.for_user(user).access_token
            current_site = get_current_site(self.context['request']).domain
            realtiveLink = reverse('email-verify')
            absurl = 'https://' + current_site + realtiveLink + "?token=" + str(token)
            email_body = 'Hi ' + user.first_name + ' Use the link below to verify your email. \n \n' + absurl
            data = {'email_body': email_body, 'email_subject': 'Verify your CryptoCon email', 'to_email': [user.email]}
            Util.send_email(data)
            return HttpResponse('Activation link expired. Link was resent to '+user.email)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class UserMeetingsView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        email = request.data.get('email')

        try:
            con = Consultant.objects.get(email=email)
        except:
            try:
                user = CustomUser.objects.get(email=email)
                con = None
            except:
                return Response({"Error": "User with that email not found"}, status=status.HTTP_404_NOT_FOUND)

        headers = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjM4MjEwMzE0LCJqdGkiOiJjNmMyODEzYy03ZWVhLTRjZWQtOWE1OC00ZjcyZjZiN2Y1MjkiLCJ1c2VyX3V1aWQiOiI5YzY3MTZkZi1kOTFlLTRjZjItOWY4OC1kNGFmOGY0NGM4YWYifQ.sNIgc_nS6nDNCD1USbsbAlRtIgTGLYtYG4IGQYG-FSI'}
        params = {"organization": "https://api.calendly.com/organizations/b370fe98-0dc5-4852-b077-75267283f099"}
        response = requests.get("https://api.calendly.com/scheduled_events/", params=params, headers=headers).json()

        data = []
        data2 = []

        for res in response['collection']:
            meeting_id = res['uri'].split("/")[4]
            response_2 = requests.get("https://api.calendly.com/scheduled_events/" + meeting_id + "/invitees", headers=headers).json()
            for r in response_2['collection']:
                if email == r['email']:
                    response_3 = requests.get(r['event'], headers=headers).json()
                    response_4 = requests.get(response_3['resource']['event_memberships'][0]['user'], headers=headers).json()
                    consultant = response_4['resource']['email']
                    response_3['consultant'] = consultant
                    data.append(response_3)

        return Response(data, status=status.HTTP_201_CREATED)
