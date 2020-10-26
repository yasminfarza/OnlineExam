from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt

from knox.views import LogoutView

from .views import UserAPIView, RegisterAPIView, LoginAPIView

urlpatterns = [
    path('', include('knox.urls')),
    path('user', UserAPIView.as_view()),
    path('register', csrf_exempt(RegisterAPIView.as_view())),
    path('login', LoginAPIView.as_view()),
    path('logout', LogoutView.as_view(), name='knox_logout')
]
