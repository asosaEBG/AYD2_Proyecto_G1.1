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
}
