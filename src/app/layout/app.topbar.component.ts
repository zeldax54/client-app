import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { LoginService } from '../login/login.service';
import { SessiontimeService } from '../shared/sessiontime/sessiontime.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private loginService: LoginService,private confirmationService: ConfirmationService,private sessionTimeService : SessiontimeService) { }

    confirmLogoff(event: Event) {
      this.confirmationService.confirm({
          key: 'confirmLogoff',
          target: event.target || new EventTarget,
          message: 'Are you sure that you want to logOff?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.logOff();
          },
          reject: () => {

          }
      });
  }

    logOff(){
      this.sessionTimeService.endSession();
    //  this.loginService.logoff();
    }
}
