from django.urls import path
from django.views.generic import TemplateView

from . import views
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
app_name = ''
urlpatterns = [
    # Not Logged In
    path('login/', TemplateView.as_view(template_name='login.html'), name='login'),
    path('request/', TemplateView.as_view(template_name='request.html'), name='register'),
    path('password/', TemplateView.as_view(template_name='password.html'), name='forgot-password'),
    path('reset/<slug:token>', TemplateView.as_view(template_name='reset.html'), name='reset-password'),
    
    # Login Required
    # path('logout/', views.logout, name='logout'),
    
    path('', TemplateView.as_view(template_name='dashboard.html'), name='index'),
    path('dashboard/', TemplateView.as_view(template_name='dashboard.html'), name='dashboard'),
    path('contact/', TemplateView.as_view(template_name='contact.html'), name='contact'),
    path('profile/', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('reports/', views.Reports.as_view(), name='reports'),
    path('campaigns/', TemplateView.as_view(template_name='campaigns.html'), name='campaigns'),
    path('campaign-details/<int:pk>', TemplateView.as_view(template_name='campaign-details.html'), name='campaign-details'),
    
    # screen recorder file upload document
    path('6784/apis/docs/<slug:part>', views.APIDoc.as_view(), name='api-doc'),
    
]
