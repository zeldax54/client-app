import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IdentityResponse } from 'src/Models/identityresponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginEndpint:string = "user/login";

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService,private router: Router) { }

  login(email: string, password: string): Observable<IdentityResponse> {
    const body = { email, password };
    const url = `${environment.userApi}${this.loginEndpint}`;
    return this.http.get<IdentityResponse>(url, { params: body }).pipe(
      map(response => response)
    );
  }

  logoff() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  //Agregar una condicion para saber si es admin
  async isLoggedIn(): Promise<boolean> {
    return this.jwtHelper.isTokenExpired();
  }
}
