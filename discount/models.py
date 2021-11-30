from django.db import models
from django.utils.translation import gettext_lazy as _


class SingleUseDiscountCode(models.Model):
    name = models.CharField(_('name'), null=True, blank=True, max_length=255)
    is_valid = models.BooleanField(default=True)
    calendly_link = models.CharField(_('calendly_link'), null=True, blank=True, max_length=255)
    used_by = models.ManyToManyField('accounts.CustomUser', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class MultiUseDiscountCode(models.Model):
    name = models.CharField(_('name'), null=True, blank=True, max_length=255)
    is_valid = models.BooleanField(default=True)
    calendly_link = models.CharField(_('calendly_link'), null=True, blank=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name