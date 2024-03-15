import { Injectable } from "@angular/core";
import { HttpService, RequestMethod } from "../http.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private httpService: HttpService) {}

  login(body: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, "/login", body);
  }
  register(body: any): Observable<any> {
    return this.httpService.request(RequestMethod.POST, "/login", body);
  }
}
