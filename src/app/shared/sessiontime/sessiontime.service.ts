import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessiontimeService {

  testinguing : string = '';
  events = ['scroll', 'keydown',"click"];
  worker : Worker|any;
  timerStarted : boolean = false;


   constructor(private loginService:LoginService) {
   }

   stopAllTimers(){
    if(this.worker != undefined)
      this.worker.postMessage({ order:"stopAllTimers", refreshCounter:0 });
   }

   start(){
    if(!this.timerStarted){

      if(typeof Worker !== 'undefined')
      {
        this.timerStarted = true;
        let that = this;
        this.events.forEach(function(event){
           document.addEventListener(event, () => {
            that.resetIddle();
          });
        });

        this.worker = new Worker(new URL('../../app.worker.ts', import.meta.url), { type: 'module' });
        let minutesUntilNextRefresh = this.nextRefreshTime() * 60;
        this.worker.postMessage({ order:"startRefresher", refreshCounter : minutesUntilNextRefresh });
        this.evaluateSession();
      }
      else{
        console.log("Worker are not supported in this browser");
      }

    }
   }

   evaluateSession()
   {
     this.worker.onmessage = (message:any)=>{
       if(message.data.event == 'TokenRefresh'){
        this.refreshToken();
       }
     }
   }

   nextRefreshTime() : number {

    let stringsaved = (localStorage.getItem("nextrefresh") == null ? 'none': localStorage.getItem("nextrefresh")) || '';
    if(stringsaved == 'none' || new Date() >= new Date(stringsaved))
    {
       this.timeInXminutes(environment.refresherTime);
       return environment.refresherTime;
    }
    else{
      let timetoReach = new Date(stringsaved);
      let timeDifferenceInMilliseconds = timetoReach.getTime() - new Date().getTime();
      return Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
    }
   }

   timeInXminutes(minutes : number) {
    const now = new Date();
    const futureTime = new Date(now.getTime() + minutes * 60 * 1000)
    localStorage.setItem('nextrefresh', futureTime.toString());
   }

   refreshToken(){
    this.loginService.refreshToken().pipe().subscribe(response=>{
      if(response.statusCode == 200){
        sessionStorage.setItem('token',response.data);
     }
      else
        console.log('error refreshing');

      this.timeInXminutes(environment.refresherTime);
      let refresherTime = this.nextRefreshTime() * 60;
      this.worker.postMessage({ order:"startRefresher", refreshCounter : refresherTime });
    });

   }


 resetIddle(){

 }
}
