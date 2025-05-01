from django.contrib import admin
from django.urls import path, include

from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('pages/', include('django.contrib.flatpages.urls')),
    path('api/', include('silant.urls')),

    path('openapi', get_schema_view(
        title="Silant",
        description="api/"
    ), name='openapi-schema'),
    path("swagger-ui/",
        TemplateView.as_view(
            template_name="swagger-ui.html",
            extra_context={"schema_url": "openapi-schema"},),
        name="swagger-ui",),
]
