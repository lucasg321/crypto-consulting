from django.contrib import admin

from questions.models import Question, Category

admin.site.register(Question)
admin.site.register(Category)
