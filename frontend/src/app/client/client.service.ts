import { Injectable } from "@angular/core";
import { HttpService, RequestMethod } from "../http.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ClientService {
  constructor(private httpService: HttpService) {}

  getUser(idCliente: string): Observable<any> {
    return this.httpService.request(RequestMethod.GET, `/cliente/${idCliente}`);
  }

}