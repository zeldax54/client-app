import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityResponse } from 'src/Models/identityresponse';
import { environment } from 'src/environments/environment';
import { ZoneModel } from 'src/Models/BussinessModel/ZoneModel';

@Injectable({
  providedIn: 'root'
})

export class ZonesService {

  addZoneEndpoint:string = "clientactions/addzone";

   constructor(private http: HttpClient) {
   }

  addAzone(zone : ZoneModel): Observable<number> {
    const url = `${environment.appApi}${this.addZoneEndpoint}`;
    return this.http.post<number>(url, zone ).pipe(
      map(response => response)
    );
  }

}
