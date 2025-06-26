import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  productos = [
    { nombre: 'Peluche Pikachu', precio: 150 },
    { nombre: 'Peluche Sans', precio: 200 },
    { nombre: 'Peluche Freddy', precio: 180 }
  ];
}
