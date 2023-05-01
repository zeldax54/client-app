import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ZoneModel } from 'src/Models/BussinessModel/ZoneModel';
import { Table } from 'primeng/table';
import { ZonesService } from './zones.service';
import { catchError, throwError } from 'rxjs';
import { HelperService } from '../helpers/services/helper.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss'],
  providers: [MessageService],
})
export class ZonesComponent implements OnInit {
  headerTile: string = '';
  cols: any[] = [];
  zones: ZoneModel[] = [];
  selectedZones: ZoneModel[] = [];
  zone: ZoneModel = {};
  zoneDialog: boolean = false;
  submitted: boolean = false;
  deleteZoneDialog: boolean = false;
  deleteZonessDialog: boolean = false;

  constructor(
    private zonesService: ZonesService,
    private messageService: MessageService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.headerTile = $localize`${'Zone Details'}`;

    this.cols = [
      { field: 'Code', header: $localize`${'Code'}` },
      { field: 'Name', header: $localize`${'Name'}` },
      { field: 'Description', header: $localize`${'Description'}` },
    ];

    this.zonesService
      .getZones()
      .pipe(
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: $localize`${'Somethin went wrong fetching the zones'}`,
            life: 3000,
          });
          return throwError(() => {
            this.zones;
          });
        })
      )
      .subscribe((response) => {
        this.zones = response;
      });
  }

  openNew() {
    this.zone = {};
    this.submitted = false;
    this.zoneDialog = true;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editZone(zone: ZoneModel) {
    this.zone = { ...zone };
    this.zoneDialog = true;
  }

  hideDialog() {
    this.zoneDialog = false;
    this.submitted = false;
  }

  saveZone() {
    this.submitted = true;
    const exist = this.zones.find(
      (z) =>
        z.Name == this.zone.Name &&
        z.Code == this.zone.Code &&
        z.Id != this.zone.Id
    );
    if (exist) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: $localize`${'Name and Code pair must be unique'}`,
        life: 3000,
      });
      return;
    }
    if (this.zone.Name?.trim() && this.zone.Code?.trim()) {
      this.zonesService
        .addAzone(this.zone)
        .pipe(
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: $localize`${'Somethin went wrong. Check for duplicate values'}`,
              life: 3000,
            });
            return throwError(() => {
              new Error(error);
            });
          })
        )
        .subscribe((result) => {
          this.zone.Id = result;
          let index = this.helperService.findIndexById(
            this.zones,
            this.zone.Id
          );
          if (index == -1) index = this.zones.length;
          this.zones[index] = this.zone;
          this.zones = [...this.zones];
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Zones Updates',
            life: 3000,
          });
          this.zoneDialog = false;
          this.zone = {};
        });
    }
  }

  deleteZone(zone: ZoneModel) {
    this.deleteZoneDialog = true;
    this.zone = { ...zone };
  }

  confirmDelete() {
    this.deleteZoneDialog = false;
    if (this.zone.Id != undefined) {
      this.zonesService
        .removeZone(this.zone.Id)
        .pipe()
        .subscribe((response) => {
          this.zones = this.zones.filter((val) => val.Id !== response);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: $localize`${'Zone Deleted'}`,
            life: 3000,
          });
          this.zone = {};
        });
    }
  }
  deleteSelectedZones() {
    this.deleteZonessDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteZonessDialog = false;

    const ids = this.selectedZones.map((z) => (z.Id == undefined ? 0 : z.Id));

    this.zonesService
      .removeBulkZones(ids)
      .pipe()
      .subscribe((response) => {
        let remainings = false;

        if (response.length > 0) {
          remainings = true;
          this.selectedZones = this.selectedZones.filter(
            (zone) => !response.map((z) => z.Id).includes(zone.Id)
          );
        }

        this.zones = this.zones.filter(
          (val) => !this.selectedZones.includes(val)
        );
        this.zones = [...this.zones];

        if (remainings)
          this.messageService.add({
            severity: 'warning',
            summary: 'Warning',
            detail: $localize`${'Some zones could not be eliminated. Because dependencies'}`,
            life: 3000,
          });
        else
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: $localize`${'Zones Deleted'}`,
            life: 3000,
          });

        this.selectedZones = [];
      });
  }
}
