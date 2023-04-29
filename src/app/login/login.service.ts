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
  refreshEndpoint:string = "identity/Tokenrefresh";

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService,private router: Router) { }

  login(email: string, password: string): Observable<IdentityResponse> {
    const body = { email, password };
    const url = `${environment.userApi}${this.loginEndpint}`;
    return this.http.get<IdentityResponse>(url, { params: body }).pipe(
      map(response => response)
    );
  }

  logoff(){
    localStorage.removeItem('token');
    localStorage.removeItem('nextrefresh');
    this.router.navigate(['/login']);
  }

  refreshToken(){
    const url = `${environment.userApi}${this.refreshEndpoint}`;
    const body = { token:localStorage.getItem('token'), role:'User' };
    return this.http.post<IdentityResponse>(url,body).pipe(
      map(response => response)
    );
  }

  async isLoggedIn(): Promise<boolean> {
    return this.jwtHelper.isTokenExpired();
  }
}
