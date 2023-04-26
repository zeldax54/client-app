/// <reference lib="webworker" />

import { environment } from "src/environments/environment";
import { Workerinput,Order,EventMessage } from "src/Models/worker.models";



class Job {
  refresherCounterInterval: any;
  refresherCounter: number = 0;

  IddleCounterInterval: any;
  IddleCounter : number = 0;
  IddleFinalCounter: number = 0;



  startRefresher(refresherTime: number) {

    this.refresherCounterInterval = setInterval(_ => {

      this.refresherCounter += 1;

      let untilRefresh = refresherTime - this.refresherCounter;

      if(environment.logtimeUntilRefresh)
         console.log('seconds ultil refresh',untilRefresh)

      if(untilRefresh <= 0){
        this.refresherCounter = 0;
        clearInterval(this.refresherCounterInterval);
        postMessage({ event: EventMessage.tokenRefresh, seconds: this.refresherCounter });

      }

    }, 1000);
  }

  startIddle(iddleTime: number,iddleMessagedelay:number) {

    this.IddleCounterInterval = setInterval(_ => {

      this.IddleCounter += 1;
      let untilIddle = iddleTime - this.IddleCounter;
      let untilFinal = (iddleTime+iddleMessagedelay)-this.IddleCounter;
      if(environment.logIddleTimers){
        console.log('seconds ultil iddle',untilIddle)
        console.log('seconds ultil final',untilFinal)
      }
      if(untilIddle <=0){
        postMessage({ event: EventMessage.iddleStart, seconds: this.refresherCounter });
        clearInterval(this.IddleCounterInterval);
        this.IddleCounter = 0;
      }

    }, 1000);

  }

  resetIdle(iddleTime: number,iddleMessagedelay:number){
    clearInterval(this.IddleCounterInterval);
    this.IddleCounter = 0;
    this.startIddle(iddleTime,iddleMessagedelay);
  }

  stopAllTimers(){
    clearInterval(this.refresherCounterInterval);
    this.refresherCounter = 0;

    clearInterval(this.IddleCounterInterval);
    this.IddleCounter = 0;
    this.IddleFinalCounter = 0;
  }
}

let job = new Job();

addEventListener('message', ({ data }) => {
  var entry = data as Workerinput;
  if (entry.order === Order.startRefresher) {
    job.startRefresher(entry.refreshCounter);
  }
  if(entry.order === Order.stopAllTimers){
    job.stopAllTimers();
  }
  if(entry.order === Order.startIddle){
    job.startIddle(entry.iddleCounter,entry.finalCounter);
  }
  if(entry.order === Order.resetIdle){
    job.resetIdle(entry.iddleCounter,entry.finalCounter);
  }
});
