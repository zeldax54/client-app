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
  getZonesEndpoint:string = "clientactions/zones";
  removeZoneEndpoint:string = "clientactions/removezone";
  bulkRemoveZonesEndpoint:string = "clientactions/bulkzonedelete";


   constructor(private http: HttpClient) {
   }

  addAzone(zone : ZoneModel): Observable<number> {
    const url = `${environment.appApi}${this.addZoneEndpoint}`;
    return this.http.post<number>(url, zone ).pipe(
      map(response => response)
    );
  }

  getZones(): Observable<ZoneModel[]> {
    const url = `${environment.appApi}${this.getZonesEndpoint}`;
    return this.http.get<ZoneModel[]>(url).pipe(
      map(response => response)
    );
  }

  removeZone(zoneId:number): Observable<number> {
    const url = `${environment.appApi}${this.removeZoneEndpoint}/${zoneId}`;
    return this.http.delete<number>(url).pipe(
      map(response => response)
    );
  }

  removeBulkZones(zoneIds:number[]): Observable<ZoneModel[]> {
    const url = `${environment.appApi}${this.bulkRemoveZonesEndpoint}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: zoneIds
    };
    return this.http.delete<ZoneModel[]>(url,options).pipe(
      map(response => response)
    );
  }



}
