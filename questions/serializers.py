from rest_framework import serializers
from questions.models import Question, Category
from accounts.serializers import ConsultantSerializer


class QuestionSerializer(serializers.ModelSerializer):
    consultants = ConsultantSerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ('question', 'consultants', 'created_at', 'updated_at')


class CategoriesSerializer(serializers.ModelSerializer):
    consultants = ConsultantSerializer(read_only=True, many=True)

    class Meta:
        model = Category
        fields = ('name', 'consultants', 'created_at', 'updated_at', 'profile_pic')
