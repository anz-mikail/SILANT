from django.urls import path
from .views import *
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView


urlpatterns = [
    path('authorization/', authorization, name='authorization'),

    path('machine/', machine, name='machine'),
    path('machine_id/', machine_id, name='machine_id'),
    path('machine/create/', create_machine, name='createMachine'),
    path('machine/category/', machine_category, name='machineCategory'),
    path('machine/list/', machine_list, name='machineList'),
    path('machine/delete/', delete_machine, name='deleteMachine'),

    path('service/', service, name='service'),
    path('service/create/', create_service, name='createService'),
    path('service/category/', service_category, name='serviceCategory'),
    path('service/delete/', delete_service, name='deleteService'),

    path('complaint/', complaint, name='complaint'),
    path('complaint/create/', create_complaint, name='createComplaint'),
    path('complaint/category/', complaint_category, name='complaintCategory'),
    path('complaint/delete/', delete_complaint, name='deleteComplaint'),

    path('category/create/', create_category, name='createCategory'),
    path('category/delete/', delete_category, name='deleteCategory'),
]
