from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('domain/admin/', admin.site.urls),
    path('domain/emotions/', include('emotions.urls')),
]