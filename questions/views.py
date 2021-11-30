from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from questions.models import Question
from accounts.models import Consultant
from accounts.serializers import ConsultantSerializer
from questions.serializers import QuestionSerializer


class QuestionView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            question = request.POST.get('question')
        except:
            question = None

        if question is not None:
            queryset = Question.objects.filter(question=question)
            serializer = QuestionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            queryset = Question.objects.all()
            serializer = QuestionSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class TagView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        tags = request.POST.get('keywords').split(",")
        data = []
        for tag in tags:
            queryset = Consultant.objects.filter(tags__contains=tag)
            serializer = ConsultantSerializer(queryset, many=True)
            data = data + serializer.data

        return Response(data, status=status.HTTP_201_CREATED)
