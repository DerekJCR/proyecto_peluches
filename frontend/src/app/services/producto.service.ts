import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://127.0.0.1:8000/api/productos/'; // Ajusta si usas otra ruta

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
