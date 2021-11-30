from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager
from core import settings

EXPERTISE_LEVELS = (
    (1, _('Level 1')),
    (2, _('Level 2')),
    (3, _('Level 3'))

)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), null=True, blank=True, max_length=255)
    last_name = models.CharField(_('last name'), null=True, blank=True, max_length=255)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Consultant(CustomUser):
    expertise = models.IntegerField(_('expertise'), choices=EXPERTISE_LEVELS, null=True, blank=True)
    description = models.CharField(_('description'), blank=True, max_length=1500)
    tags = models.CharField(_('tags'), max_length=1500, blank=True, help_text=(_("Add a comma separated list of tags "
                                                                                 "associated with the consultant.")))
    profile_pic = models.ImageField(upload_to="media_cdn/uploads", blank=True)
    calendly_id = models.CharField(_('calendly id'), max_length=255, blank=True, null=True)

    def __str__(self):
        return self.email

    def natural_key(self):
        return self.email

    def get_image(self):
        if self.profile_pic:
            return self.profile_pic.url
        else:
            return settings.STATIC_URL + 'img/default/meal.png'