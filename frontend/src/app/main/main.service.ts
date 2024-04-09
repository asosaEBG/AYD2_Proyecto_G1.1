import { Injectable } from "@angular/core";
import { HttpService, RequestMethod } from "../http.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MainService {
  constructor(private httpService: HttpService) {}

  obtenerCategorias(): Observable<any> {
    return this.httpService.request(RequestMethod.GET, "/categoria_producto");
  }

  obtenerValoraciones(): Observable<any> {
    return this.httpService.request(RequestMethod.GET, "/valoracion_pagina");
  }

  crearValoracion(valoracion: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, "/valoracion_pagina", valoracion);
  }

  actualizarValoracion(idValoracion: string, valoracion: any): Observable<any> {
    return this.httpService.request(RequestMethod.PUT, `/valoracion_pagina/${idValoracion}`, valoracion);
  }

  eliminarValoracion(idValoracion: string): Observable<any> {
    return this.httpService.request(RequestMethod.DELETE, `/valoracion_pagina/${idValoracion}`);
  }
  
  obtenerProductoPorId(idProducto: string): Observable<any> {
    return this.httpService.request(RequestMethod.GET, `/producto/${idProducto}`);
  }

  obtenerComentariosDeProducto(idProducto: string): Observable<any> {
    return this.httpService.request(RequestMethod.GET, `/retroalimentacion_producto/producto/${idProducto}`)
  }
  crearComentarioDeProducto(comentario: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, `/retroalimentacion_producto`, comentario)
  }
  
  eliminarComentario(idComentario: number): Observable<any> {
    return this.httpService.request(RequestMethod.DELETE, `/retroalimentacion_producto/${idComentario}`);
  }

  buscar(): Observable<any> {
    return this.httpService.request(RequestMethod.GET, "/producto");
  }

  agregarAlCarrito(idCliente: number, carrito: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, `/carrito/use/${idCliente}`, carrito);
  }
}