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
  listEndpoint:string = 'whatsapp/configurelist';
  removeRegisterEndpoint:string = 'whatsapp/removeregister';




  constructor(private http: HttpClient) { }

  configure(number:string,waitForQR:string,waitForEnd:string): Observable<ApiResponse>{
    const url = `${environment.appApi}${this.configureEndpoint}`;
    const body = { number:number,waitforQRTime:waitForQR,waitforEndTime:waitForEnd };
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

  list(): Observable<ApiResponse>{
    const url = `${environment.appApi}${this.listEndpoint}`;

    return this.http.get<ApiResponse>(url).pipe(
      map(response => response)
    );
  }

  removeRegister(id:Number){
    const url = `${environment.appApi}${this.removeRegisterEndpoint}`;
    const body = { id:id};
    return this.http.post<ApiResponse>(url, body).pipe(
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
