import { Component, OnInit } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { SessiontimeService } from '../shared/sessiontime/sessiontime.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent  {

  constructor(public layoutService: LayoutService,private sessionTimeService: SessiontimeService) {
      this.sessionTimeService.start();
     }
}
