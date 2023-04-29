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
  description :string = '';

  constructor(private sessionTimeService : SessiontimeService){
    this.sessionTimeService.start();
    this.endTime$.subscribe(value=>{
      if(value>60){
        this.description = 'minutes.'
        value = Math.floor(value/60);
      }else
        this.description = 'seconds.'

      this.isFinalValue = value;
    })
  }

  continue(){this.sessionTimeService.resetSession();}
  logOff(){this.sessionTimeService.endSession();}

}
