from discount.models import SingleUseDiscountCode, MultiUseDiscountCode
from accounts.models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status


class DiscountView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        code = request.data.get('code')
        email = request.data.get('email')

        try:
            discount = SingleUseDiscountCode.objects.get(name=code)
        except:
            try:
                discount = MultiUseDiscountCode.objects.get(name=code)
            except:
                return Response({"Error": "That discount code does not exist."}, status=status.HTTP_404_NOT_FOUND)

        if discount.is_valid is False:
            return Response({"Error": "That discount code is no longer valid."}, status=status.HTTP_404_NOT_FOUND)

        try:
            for user in discount.used_by.all():
                if user.email == email:
                    return Response({"Error": "You have already redeemed that code."}, status=status.HTTP_404_NOT_FOUND)
            discount.used_by.add(CustomUser.objects.get(email=email))
        except:
            pass

        return Response({"Success": "The code has been redeemed."}, status=status.HTTP_201_CREATED)
