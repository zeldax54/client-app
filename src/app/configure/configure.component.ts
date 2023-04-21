import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { WConfigureService } from './wconfigure.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss'],
  providers: [MessageService]
})
export class ConfigureComponent implements OnInit {

  routeItems: MenuItem[] = [];
  activeItem: MenuItem ={};


  constructor(public layoutService: LayoutService,private router:Router,private wconfigureservice:WConfigureService,private confirmationService:ConfirmationService,private messageService:MessageService){
  }

  ngOnInit(): void {
    this.routeItems = [
      { label: 'Number', routerLink: 'number',icon: 'pi pi-fw pi-phone' },
      { label: 'QR Code', routerLink: 'qrcode',icon: 'pi pi-fw pi-qrcode'}
     ];
     this.activeItem = this.routeItems[0];

     this.router.navigate(['/configure/number']);
  }

}
