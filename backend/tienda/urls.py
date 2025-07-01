from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, ProductoViewSet, ReciboViewSet, AdministradorViewSet, EnvioViewSet, LoginView, enviar_correo

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'recibos', ReciboViewSet)
router.register(r'administradores', AdministradorViewSet)
router.register(r'envios', EnvioViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/enviar-correo/', enviar_correo),
]
