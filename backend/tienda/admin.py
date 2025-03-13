from django.contrib import admin
from .models import Cliente, Producto, Recibo, Envio, MetodoPago, ReciboProducto

admin.site.register(Cliente)
admin.site.register(Producto)
admin.site.register(Recibo)
admin.site.register(Envio)
admin.site.register(MetodoPago)
admin.site.register(ReciboProducto)