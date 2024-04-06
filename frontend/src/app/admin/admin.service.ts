import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, RequestMethod } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpService) { }

  crearCategoria(categoria: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, "/categoria_producto", categoria);
  }

  crearProveedor(proveedor: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, "/proveedor", proveedor);
  }

  obtenerProveedores(): Observable<any> {
    return this.httpService.request(RequestMethod.GET, "/proveedor");
  }

  eliminarProveedor(idProveedor: number): Observable<any> {
    return this.httpService.request(RequestMethod.DELETE, `/proveedor/${idProveedor}`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, "/producto", producto);
  }

  obtenerProductos(): Observable<any> {
    return this.httpService.request(RequestMethod.GET, "/producto");
  }

  obtenerProductoPorId(idProducto: string): Observable<any> {
    return this.httpService.request(RequestMethod.GET, `/producto/${idProducto}`);
  }

  actualizarProducto(idProducto: number, producto: any): Observable<any> {
    return this.httpService.request(RequestMethod.PUT, `/producto/${idProducto}`, producto);
  }

  eliminarProducto(idProducto: number): Observable<any> {
    return this.httpService.request(RequestMethod.DELETE, `/producto/${idProducto}`);
  }
}
