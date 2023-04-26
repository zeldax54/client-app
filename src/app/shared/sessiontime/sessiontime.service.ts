import { Injectable } from '@angular/core';
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


   constructor(private loginService:LoginService) {
   }

   stopAllTimers(){
    if(this.worker != undefined)
      this.worker.postMessage({ order:Order.stopAllTimers, refreshCounter:0 });
   }

   start(){

      if(typeof Worker !== 'undefined')
      {
        this.stopAllTimers();
        console.log('Stating worker')
        let that = this;
        this.events.forEach(function(event){
           document.addEventListener(event, () => {
            that.resetIddle();
          });
        });

        this.worker = new Worker(new URL('../../app.worker.ts', import.meta.url), { type: 'module' });
        let minutesUntilNextRefresh = this.nextRefreshTime() * 60;
        this.worker.postMessage({ order:Order.startRefresher, refreshCounter : minutesUntilNextRefresh });
        this.worker.postMessage({ order:Order.startIddle, iddleCounter : environment.iddleTime * 60,finalCounter:environment.iddleFinal * 60 });
        this.evaluateSession();
      }
      else{
        console.log("Worker are not supported in this browser");
      }


   }

   evaluateSession()
   {
     this.worker.onmessage = (message:any)=>{
       if(message.data.event == EventMessage.tokenRefresh){
        this.refreshToken();
       }
       if(message.data.event == EventMessage.iddleStart){
        alert('manda ventana bloqueada iddlestart');
       }
       if(message.data.event == EventMessage.iddlefinalStart)
       {
        this.loginService.logoff();
       }
     }
   }



  resetIddle(){
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
      return Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
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
