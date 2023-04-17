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

  constructor(private http: HttpClient) { }

  configure(number:string): Observable<ApiResponse>{
    const url = `${environment.appApi}${this.configureEndpoint}`;
    const body = { number };
    return this.http.get<ApiResponse>(url, { params: body }).pipe(
      map(response => response)
    );
  }

}
