import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityResponse } from 'src/Models/identityresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  registerEndpint:string = "user/register";
  domain:string='';

   constructor(private http: HttpClient) {
    this.domain = environment.userApi
   }

  register(name: string, lastname: string, email: string, password: string): Observable<IdentityResponse> {
    const body = { name, lastname, email, password };
    const url = `${this.domain}${this.registerEndpint}`;
    return this.http.get<IdentityResponse>(url, { params: body }).pipe(
      map(response => response)
    );
  }

}
