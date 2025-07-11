# Generated by Django 5.1.7 on 2025-03-13 01:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id_cliente', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('correo', models.EmailField(max_length=254, unique=True)),
                ('contraseña', models.CharField(max_length=50)),
                ('telefono', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='MetodoPago',
            fields=[
                ('id_metodo', models.AutoField(primary_key=True, serialize=False)),
                ('tipo', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id_producto', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('descripcion', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Recibo',
            fields=[
                ('id_recibo', models.AutoField(primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tienda.cliente')),
                ('metodo_pago', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tienda.metodopago')),
            ],
        ),
        migrations.CreateModel(
            name='Envio',
            fields=[
                ('id_envio', models.AutoField(primary_key=True, serialize=False)),
                ('direccion', models.TextField()),
                ('estado', models.CharField(max_length=50)),
                ('recibo', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='tienda.recibo')),
            ],
        ),
        migrations.CreateModel(
            name='ReciboProducto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField(default=1)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tienda.producto')),
                ('recibo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tienda.recibo')),
            ],
            options={
                'unique_together': {('recibo', 'producto')},
            },
        ),
    ]
