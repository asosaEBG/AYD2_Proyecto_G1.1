import { Injectable } from "@angular/core";
import { HttpService, RequestMethod } from "../http.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MainService {
  constructor(private httpService: HttpService) {}

  obtenerCategorias(): Observable<any> {
    return this.httpService.request(RequestMethod.GET, "/categoria_producto");
  }
}