import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, catchError, of, switchMap, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "./auth.types";

@Injectable({ providedIn: "root" })
export class AuthService {
  private serverUrl: string = "http://localhost:9000";
  private authenticated = false;
  private tokenSubject: BehaviorSubject<string>;
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private httpClient: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(null);
  }


  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }

  get token(): string {
    return this.tokenSubject.value;
  }

  set user(value: User) {
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  login(body: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/auth/login`, body).pipe(
      catchError((err) => {
        console.log(err);
        return of(false)
      }),
      switchMap((response: any) => {
        if (response.AuthenticationResult.RefreshToken) {
          this.refreshToken = response.AuthenticationResult.RefreshToken;
        }
        this.tokenSubject.next(response.AuthenticationResult.AccessToken);
        this.getUser().pipe(take(1)).subscribe(userResponse => {
          this.user = {
            tipoUsuario: userResponse.database.tipo_usuario,
            email: userResponse.cognito.email,
            emailVerified: userResponse.cognito.email_verified,
            estado: userResponse.database.estado_usuario,
            idCliente: userResponse.database.id_cliente,
            idColaborador: userResponse.database.id_colaborador,
            idUsr: userResponse.database.id_usr,
            username: userResponse.cognito.username
          };
        }, err => {
          console.log(err);
        });
        this.authenticated = true;
        return of(response);
      })
    );
  }

  loginWithRefreshToken(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/auth/refresh`, { headers: { authorization: `Bearer ${this.refreshToken}` } }).pipe(
      catchError(() => {
        return of(false)
      }),
      switchMap((response: any) => {
        if (response.RefreshToken) {
          this.refreshToken = response.RefreshToken;
        }
        this.tokenSubject.next(response.AccessToken);
        this.getUser().pipe(take(1)).subscribe(userResponse => {
          this.user = {
            tipoUsuario: userResponse.database.tipo_usuario,
            email: userResponse.cognito.email,
            emailVerified: userResponse.cognito.email_verified,
            estado: userResponse.database.estado_usuario,
            idCliente: userResponse.database.id_cliente,
            idColaborador: userResponse.database.id_colaborador,
            idUsr: userResponse.database.id_usr,
            username: userResponse.cognito.username
          };
        }, err => {
          console.log(err);
        });
        this.authenticated = true;
        return of(true);
      })
    );
  }

  register(body: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/cliente`, body);
  }

  getUser(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/auth/get-usr`, { headers: { authorization: `Bearer ${this.tokenSubject.value}` } }).pipe(
      catchError((err) => {
        console.log(err);
        return of(false);
      }),
      switchMap((response: any) => {
        return of(response);
      })
    )
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('refreshToken');

    // Set the authenticated flag to false
    this.authenticated = false;
    this.tokenSubject.next(null);
    // Return the observable
    return of(true);
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this.authenticated) {
        return of(true);
    }

    // Check the access token availability
    if (!this.refreshToken) {
        return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.loginWithRefreshToken();
  }
}
