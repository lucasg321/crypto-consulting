from django.db import models
from django.utils.translation import gettext_lazy as _

EXPERTISE_LEVELS = (
    (1, _('Level 1')),
    (2, _('Level 2')),
    (3, _('Level 3')),
)


class Category(models.Model):
    name = models.CharField(max_length=100)
    consultants = models.ManyToManyField('accounts.Consultant', related_name='name')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    profile_pic = models.ImageField(upload_to="media_cdn/uploads", blank=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    expertise = models.IntegerField(_('expertise'), choices=EXPERTISE_LEVELS, null=True, blank=True)
    question = models.CharField(max_length=10000)
    categories = models.ManyToManyField('questions.Category')
    consultants = models.ManyToManyField('accounts.Consultant')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question
