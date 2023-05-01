import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryModel } from 'src/Models/BussinessModel/CountryModel';


@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor(private http: HttpClient){}

  findIndexById(array:any[],id: number): number {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i].Id === id) {
            index = i;
            break;
        }
    }

    return index;
 }

 countries():Observable<CountryModel[]>{
  return this.http.get<any>('/assets/staticData/countries.json').pipe(
    map(response => response)
  );
 }

}
