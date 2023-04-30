import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ZoneModel } from 'src/Models/BussinessModel/ZoneModel';
import { Table } from 'primeng/table';
import { ZonesService } from './zones.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss'],
  providers:[MessageService]
})


export class ZonesComponent implements OnInit {

  headerTile :string = '';
  cols: any[] = [];
  zones : ZoneModel[] = [];
  selectedZones : ZoneModel[] = [];
  zone: ZoneModel = {};
  zoneDialog: boolean = false;
  submitted: boolean = false;

  constructor(private zonesService : ZonesService,private messageService: MessageService){}

  ngOnInit(): void {

    this.headerTile = $localize `${'Zone Details'}`;

    this.cols = [
      { field: 'Code', header:  $localize `${'Code'}` },
      { field: 'Name', header:  $localize `${'Name'}` },
      { field: 'Description', header:  $localize `${'Description'}` },

    ];

  }

  openNew(){
    this.zone = {};
    this.submitted = false;
    this.zoneDialog = true;
  }
  onGlobalFilter(table: Table, event: Event){}
  editZone(zone:Zone){}
  deleteZone(zone:Zone){}
  hideDialog(){
    this.zoneDialog = false;
    this.submitted = false;
  }
  saveZone(){
    this.submitted = true;
    if (this.zone.Name?.trim() && this.zone.Code?.trim()) {
      this.zonesService.addAzone(this.zone).pipe(
        catchError((error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somethin went wrong', life: 3000 });
          return throwError(()=>{new Error(error)});
        })
      ).subscribe(result=>{
        this.zone.Id = result;
        this.zones.push(this.zone);
        this.zones = [...this.zones];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Zone Created', life: 3000 });
        this.zoneDialog = false;
        this.zone = {};
      });

    }

  }



}
