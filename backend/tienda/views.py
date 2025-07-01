import requests
import jwt
import datetime
from rest_framework import viewsets
from django.conf import settings
from .models import Cliente, Producto, Recibo, Administrador, Envio
from .serializers import ClienteSerializer, ProductoSerializer, ReciboSerializer, AdministradorSerializer, EnvioSerializer
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connection
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response

SUPABASE_URL = 'https://qvqpeccncxkkeaxiaphv.supabase.co'
SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cXBlY2NuY3hra2VheGlhcGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTE0MjQsImV4cCI6MjA2NjM2NzQyNH0.F6uQp3fozGZu6z4ESwNan_9E-jzEDESod3watQqmiEM'
SECRET_KEY = 'tu_clave_secreta'

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    def create(self, request, *args, **kwargs):
        print(request.data)  # Esto imprimirá los datos recibidos en la consola de Django
        return super().create(request, *args, **kwargs)

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ReciboViewSet(viewsets.ModelViewSet):
    queryset = Recibo.objects.all()
    serializer_class = ReciboSerializer

class AdministradorViewSet(viewsets.ModelViewSet):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer

class EnvioViewSet(viewsets.ModelViewSet):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer

class LoginView(APIView):
    def post(self, request):
        nombre = request.data.get('nombre')  # Nombre (correo) que el usuario ingresa
        contraseña = request.data.get('contraseña')  # Contraseña que el usuario ingresa

        if not nombre or not contraseña:
            return Response({'error': 'Por favor ingrese ambos campos'}, status=400)

        try:
            # Realizar la consulta a la base de datos de Supabase (PostgreSQL)
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM tienda_cliente WHERE nombre = %s", [nombre])
                usuario = cursor.fetchone()  # Obtener el primer resultado

            if usuario and usuario[3] == contraseña:  # Verificar que la contraseña coincida (usuario[3] corresponde a 'contraseña')
                # Generar el token JWT manualmente usando PyJWT
                payload = {
                    'uid': usuario[0],  # Asumimos que el ID del cliente es el primer valor en la tupla (usuario[0])
                    'nombre': usuario[1],   # El nombre está en la segunda posición (usuario[1])
                    'correo': usuario[2],
                    'contraseña': usuario[3],
                    'telefono': usuario[4],
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expiración del token (1 hora)
                }

                # Generar el token JWT
                token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

                return Response({
                    'token': token,
                    'uid' : usuario[0],
                    'nombre': usuario[1],  # Devolver el nombre del usuario
                    'correo': usuario[2],
                    'contraseña': usuario[3],
                    'telefono': usuario[4]
                })
            else:
                return Response({'error': 'Credenciales incorrectas'}, status=400)

        except Exception as e:
            return Response({'error': f'Error en la autenticación: {str(e)}'}, status=400)

@api_view(['POST'])
def enviar_correo(request):
    destino = request.data.get('destino')
    mensaje = request.data.get('mensaje')

    if not destino or not mensaje:
        return Response({'error': 'Faltan campos'}, status=400)

    try:
        send_mail(
            subject='Mensaje de Peluchelandia',
            message=mensaje,
            from_email='hernandeztorresca12@gmail.com',  # Cambia por un remitente válido
            recipient_list=[destino],
            fail_silently=False,
        )
        return Response({'success': 'Correo enviado'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)