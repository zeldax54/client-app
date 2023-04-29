import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';
import { Workerinput,Order,EventMessage } from "src/Models/worker.models";

@Injectable({
  providedIn: 'root'
})
export class SessiontimeService {

  testinguing : string = '';
  events = ['scroll', 'keydown',"click"];
  worker : Worker|any;
  isfinal:boolean = false;
  stopAll: boolean = false;

  isFinalShow$ = new Subject<boolean>;
  endTime$ = new Subject<number>;



  showFinal():void {
   this.isFinalShow$.next(true);
  }

  hideFinal():void {
   this.isFinalShow$.next(false);
  }

   constructor(private loginService:LoginService) { }

   stopAllTimers(){
    if(this.worker != undefined)
      this.worker.postMessage({ order:Order.stopAllTimers, refreshCounter:0 });
   }

   start(){

      if(typeof Worker !== 'undefined')
      {
        this.stopAll = false;
        this.stopAllTimers();
        this.isfinal = false;
        let that = this;
        this.events.forEach(function(event){
           document.addEventListener(event, () => {
            that.resetIddle();
          });
        });

        this.worker = new Worker(new URL('../../app.worker.ts', import.meta.url), { type: 'module' });
        this.loginService.isLoggedIn().then(isLogginExpired=>{
          if(isLogginExpired == false)
          {
            let minutesUntilNextRefresh = this.nextRefreshTime() * 60;
            this.worker.postMessage({ order:Order.startRefresher, refreshCounter : minutesUntilNextRefresh });
            this.worker.postMessage({ order:Order.startIddle, iddleCounter : environment.iddleTime * 60 });
            this.evaluateSession();
          }
        })
      }
      else
        console.log("Worker are not supported in this browser");
    }

   evaluateSession()
   {
     this.worker.onmessage = (message:any)=>{
       if(message.data.event == EventMessage.tokenRefresh)
          this.refreshToken();

        if(message.data.event == EventMessage.iddleStart){
        this.worker.postMessage({ order:Order.startFinal,finalCounter:environment.iddleFinal * 60});
        this.isfinal = true;
        this.showFinal();
       }

       if(message.data.event == EventMessage.iddlefinalStart)
          this.endSession();

       if(message.data.event == EventMessage.finishTick)
          this.endTime$.next(message.data.seconds);
     }
   }

   endSession(){
    this.stopAll = true;
    this.stopAllTimers();
    this.hideFinal();
    localStorage.removeItem('nextrefresh');
    this.loginService.logoff();
   }

   resetSession(){
    this.stopAll = false;
    this.stopAllTimers();
    this.start();
    this.refreshToken();
    this.hideFinal();
   }


  resetIddle(){
    if(!this.isfinal && !this.stopAll)
       this.worker.postMessage({ order:Order.resetIdle,iddleCounter : environment.iddleTime * 60,finalCounter:environment.iddleFinal * 60});
  }

   nextRefreshTime() : number {

    const stringsaved = (localStorage.getItem("nextrefresh") == null ? 'none': localStorage.getItem("nextrefresh")) || '';
    const nowUtc = new Date().toUTCString();
    const nowUtcDate = new Date(nowUtc);

    if(stringsaved == 'none' || nowUtcDate >= new Date(stringsaved))
    {
       this.timeInXminutes(environment.refresherTime);
       return environment.refresherTime;
    }
    else{
      let timetoReach = new Date(stringsaved);
      let timeDifferenceInMilliseconds = timetoReach.getTime() - nowUtcDate.getTime();
      const mins = Math.floor(timeDifferenceInMilliseconds / (1000 * 60))
      return mins == 0 ? 1 : mins;
    }
   }

   timeInXminutes(minutes : number) {
    const nowUtc = new Date().toUTCString();
    const nowUtcDate = new Date(nowUtc);
    const futureTime = new Date(nowUtcDate.getTime() + minutes * 60 * 1000)
    localStorage.setItem('nextrefresh', futureTime.toUTCString());
   }

   refreshToken(){
    this.loginService.refreshToken().pipe().subscribe(response=>{
      if(response.statusCode == 200){
        localStorage.setItem('token',response.data);
     }
      else
        console.log('error refreshing');

      this.timeInXminutes(environment.refresherTime);
      let refresherTime = this.nextRefreshTime() * 60;
      this.worker.postMessage({ order:Order.startRefresher, refreshCounter : refresherTime });
    });
   }

}
