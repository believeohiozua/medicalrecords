from django.urls import path, re_path,include
from knox import views as knox_views
from .views import (
        RegisterListView,
        RegisterDetailView,
        SignupAPI, 
        StaffSignupAPI,
        LoginAPI, 
        UserAPI,
        
    )


app_name = 'data'
urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/signup', SignupAPI.as_view()),
    path('api/auth/staffsignup', StaffSignupAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('', RegisterListView.as_view(), name='list-create'),
    path('<pk>/', RegisterDetailView.as_view(), name='detail'),  
    
 
]
 