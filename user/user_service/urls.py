from django.urls import path
from .views import StudentRegistrationView,LecturerRegistrationView,LoginView,LoginLectureView,ChangePasswordView

urlpatterns = [
    path('register-student/', StudentRegistrationView.as_view(), name='register-student'),
    path('register-teacher/', LecturerRegistrationView.as_view(), name='register-teacher'),
    path('login/', LoginView.as_view(), name='login'),
    path('login-teacher/', LoginLectureView.as_view(), name='login-teacher'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    
    

]
