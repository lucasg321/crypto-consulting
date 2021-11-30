from rest_framework import serializers
from accounts.models import CustomUser, Consultant
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from core.utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    first_name = serializers.CharField(write_only=True, required=False)
    last_name = serializers.CharField(write_only=True, required=False)

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('password2')

        user = CustomUser.objects.create(**validated_data)

        user.set_password(password)
        user.is_active = False
        user.save()

        # Send confirmation/activation email
        token = RefreshToken.for_user(user).access_token

        current_site = get_current_site(self.context['request']).domain
        realtiveLink = reverse('email-verify')
        absurl = 'https://'+current_site+realtiveLink+"?token="+str(token)
        email_body = 'Hi '+user.first_name+' Use the link below to verify your email. \n \n' + absurl
        data = {'email_body': email_body, 'email_subject': 'Verify your CryptoCon email', 'to_email': [user.email]}

        Util.send_email(data)

        return user


class ConsultantSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    class Meta:
        model = Consultant
        fields = ('email', 'first_name', 'last_name', 'date_joined', 'expertise', 'description', 'calendly_id', 'tags', 'image_url', 'is_active')

    def get_image_url(self, obj):
        # request = self.context.get('request')
        print(obj.profile_pic)
        print(obj.profile_pic.url)
        return 'http://localhost:8000' + obj.profile_pic.url
