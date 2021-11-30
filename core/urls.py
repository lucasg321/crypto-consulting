"""crypto consulting URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include
from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views
from accounts import views as account_views
from questions import views as question_views
from discount import views as discount_views

from core import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # social-auth includes: /social-auth/login/google-oauth2/ /social-auth/login/facebook/ /social-auth/login/apple-id/
    path('social-auth/', include('social_django.urls', namespace='social')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/login/', account_views.login, name='login'),
    # path('api/logout/', account_views.logout, name='logout'),
    path('api/register/', account_views.RegisterView.as_view(), name='register'),
    path('api/email-verify/', account_views.VerifyEmail.as_view(), name='email-verify'),
    path('api/user/', account_views.UserView.as_view(), name='user-info'),
    path('api/sso-register-login/', account_views.SSORegisterLoginView.as_view(), name='register-login-sso'),
    # path('api/reset-password/', account_views.reset_password, name='reset-password'),
    path('api/consultant/', account_views.ConsultantView.as_view(), name='consultant-info'),
    path('api/question/', question_views.QuestionView.as_view(), name='question-info'),
    path('api/tags/', question_views.TagView.as_view(), name='tag-info'),
    url(regex=r'^email-users/$', view=account_views.SendNewsletter.as_view(), name='email'),
    path('api/discount/', discount_views.DiscountView.as_view(), name='discount'),
    path('api/meetings/', account_views.UserMeetingsView.as_view(), name='meetings'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
