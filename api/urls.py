from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'permissions', views.PermissionViewSet)
router.register(r'question', views.QuestionViewSet)
router.register(r'question/search/(?P<query>[^/.]+)', views.QuestionViewSet)
router.register(r'subject', views.SubjectViewSet)
router.register(r'examination', views.ExaminationViewSet)
router.register(r'examination-set/(?P<id>[^/.]+)', views.ExaminationSetViewSet)
router.register(r'examination-set-component/(?P<examination_id>[^/.]+)', views.ExaminationSetViewSet)
router.register(r'assign', views.AssignViewSet)
router.register(r'user-component', views.UserComponentViewSet)
router.register(r'start-examination/(?P<id>[^/.]+)', views.StartExaminationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('accounts.urls')),
    path('answer/', csrf_exempt(views.AnswerViewSet.as_view()))
]