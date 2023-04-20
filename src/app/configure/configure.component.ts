import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { WConfigureService } from './wconfigure.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  routeItems: MenuItem[] = [];
  activeItem: MenuItem ={};
  idFrozen: boolean = false;

  constructor(public layoutService: LayoutService,private router:Router){

  }
  ngOnInit(): void {
    this.routeItems = [
      { label: 'Number', routerLink: 'number',icon: 'pi pi-fw pi-phone' },
      { label: 'QR Code', routerLink: 'qrcode',icon: 'pi pi-fw pi-qrcode'},
      { label: 'Result', routerLink: 'result',icon: 'pi pi-fw pi-image' }
     ];
     this.activeItem = this.routeItems[0];
     this.router.navigate(['/configure/number']);
  }
}
