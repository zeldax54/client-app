import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/Models/apiresponse';
import { IdentityResponse } from 'src/Models/identityresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WConfigureService {

  configureEndpoint:string = 'whatsapp/configure';
  cleanEndpoint:string = 'whatsapp/cleanbuild';


  constructor(private http: HttpClient) { }

  configure(number:string): Observable<ApiResponse>{
    const url = `${environment.appApi}${this.configureEndpoint}`;
    const body = { number:number };
    return this.http.post<ApiResponse>(url, body).pipe(
      map(response => response)
    );
  }

  clean(): Observable<ApiResponse>{
    const url = `${environment.appApi}${this.cleanEndpoint}`;

    return this.http.get<ApiResponse>(url).pipe(
      map(response => response)
    );
  }

  testUser(){

    const url = `${environment.userApi}User/UserInfo`;

    return this.http.get<ApiResponse>(url).pipe(
      map(response => response)
    );
  }

}
