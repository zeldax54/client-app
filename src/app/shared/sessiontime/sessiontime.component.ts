import { Component } from '@angular/core';
import { SessiontimeService } from './sessiontime.service';

@Component({
  selector: 'app-sessiontime',
  templateUrl: './sessiontime.component.html',
  styleUrls: ['./sessiontime.component.scss'],
})

export class SessionTimeComponent {

  isFinalShow$ = this.sessionTimeService.isFinalShow$;
  endTime$ = this.sessionTimeService.endTime$;
  isFinalValue:number = 0;

  constructor(private sessionTimeService : SessiontimeService){
    this.endTime$.subscribe(value=>{
      if(value>60)
        value = value/60;
      this.isFinalValue = value;
    })
  }

}
