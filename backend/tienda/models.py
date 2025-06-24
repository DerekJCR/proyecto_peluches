from django.db import models

class Administrador(models.Model):
    id_administrador = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=50)
    telefono = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class MetodoPago(models.Model):
    id_metodo = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=50)

    def __str__(self):
        return self.tipo

class Recibo(models.Model):
    id_recibo = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'Recibo {self.id_recibo} - {self.total}'

class Envio(models.Model):
    id_envio = models.AutoField(primary_key=True)
    direccion = models.TextField()
    estado = models.CharField(max_length=50)
    recibo = models.OneToOneField(Recibo, on_delete=models.CASCADE)

    def __str__(self):
        return f'Envío {self.id_envio} - {self.estado}'

class ReciboProducto(models.Model):
    recibo = models.ForeignKey(Recibo, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)

    class Meta:
        unique_together = ('recibo', 'producto')

    def __str__(self):
        return f'{self.producto.nombre} x {self.cantidad}'
