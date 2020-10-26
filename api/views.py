from threading import Thread

from django.template.loader import render_to_string
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from email.mime.application import MIMEApplication
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from .serializers import *
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS, AllowAny


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = self.queryset
        if self.kwargs and 'query' in self.kwargs:
            queryset = queryset.filter(question__contains=self.kwargs['query'])
        return queryset


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class ExaminationViewSet(viewsets.ModelViewSet):
    queryset = Examination.objects.all()
    serializer_class = ExaminationSerializer


class ExaminationSetViewSet(viewsets.ModelViewSet):
    queryset = ExaminationSet.objects.all()
    serializer_class = ExaminationSetSerializer

    def get_queryset(self):
        queryset = self.queryset
        if 'examination_id' in self.kwargs:
            queryset = queryset.filter(examination_id=self.kwargs['examination_id']).order_by('set')
        else:
            queryset = queryset.filter(id=self.kwargs['id'])
        return queryset


class AssignViewSet(viewsets.ModelViewSet):
    queryset = Assign.objects.all()
    serializer_class = AssignSerializer


class UserComponentViewSet(viewsets.ModelViewSet):
    queryset = User.objects.exclude(is_superuser=True)
    serializer_class = UserComponentSerializer


class StartExaminationViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    queryset = Assign.objects.all()
    serializer_class = StartExaminationSerializer

    def get_queryset(self):
        queryset = self.queryset
        queryset = queryset.filter(user_id=self.kwargs['id'])
        return queryset


class AnswerViewSet(APIView):
    parser_classes = [JSONParser]

    def post(self, request, format=None):
        # thread = Thread(target=self.send_email, args=request.data)
        # thread.start()
        return Response({'received data': request.data})

