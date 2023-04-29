/// <reference lib="webworker" />

import { environment } from "src/environments/environment";
import { Workerinput,Order,EventMessage } from "src/Models/worker.models";



class Job {
  refresherCounterInterval: any;
  refresherCounter: number = 0;

  IddleCounterInterval: any;
  IddleFinalCounterInterval: any;

  IddleCounter : number = 0;
  IddleFinalCounter: number = 0;



  startRefresher(refresherTime: number) {

      clearInterval(this.refresherCounterInterval);
      this.refresherCounterInterval = setInterval(_ => {

        this.refresherCounter += 1;

        let untilRefresh = refresherTime - this.refresherCounter;

        if(environment.logtimeUntilRefresh)
           console.log('seconds ultil refresh id '+this.refresherCounterInterval+':',untilRefresh)

        if(untilRefresh <= 0){
          this.refresherCounter = 0;
          clearInterval(this.refresherCounterInterval);
          postMessage({ event: EventMessage.tokenRefresh, seconds: this.refresherCounter });
        }

      }, 1000);
  }

  startIddle(iddleTime: number) {

    this.IddleCounterInterval = setInterval(_ => {

      this.IddleCounter += 1;
      let untilIddle = iddleTime - this.IddleCounter;
      if(environment.logIddleTimers){
        console.log('seconds ultil iddle',untilIddle)
      }
      if(untilIddle <=0){
        postMessage({ event: EventMessage.iddleStart, seconds: this.refresherCounter });
        clearInterval(this.IddleCounterInterval);
        this.IddleCounter = 0;
      }

    }, 1000);
  }

  startFinal(iddleMessagedelay:number) {

    this.IddleFinalCounterInterval = setInterval(_ => {

      this.IddleFinalCounter += 1;
      let untilFinal = iddleMessagedelay-this.IddleFinalCounter;
      postMessage({ event: EventMessage.finishTick, seconds: untilFinal });

      if(environment.logIddleTimers){
        console.log('seconds ultil final',untilFinal)
      }
      if(untilFinal <=0){
        postMessage({ event: EventMessage.iddlefinalStart });
        clearInterval(this.IddleFinalCounterInterval);
        this.IddleFinalCounter = 0;
      }

    }, 1000);

  }


  resetIdle(iddleTime: number){
    clearInterval(this.IddleCounterInterval);
    clearInterval(this.IddleFinalCounterInterval);
    this.IddleCounter = 0;
    this.IddleFinalCounter = 0;
    this.startIddle(iddleTime);
  }

  stopAllTimers(){
    clearInterval(this.refresherCounterInterval);
    this.refresherCounterInterval = null;
    this.refresherCounter = 0;

    clearInterval(this.IddleCounterInterval);
    this.IddleCounterInterval = null;
    clearInterval(this.IddleFinalCounterInterval);
    this.IddleFinalCounterInterval = null;
    this.IddleCounter = 0;
    this.IddleFinalCounter = 0;
  }

  stopIdle(){
    clearInterval(this.IddleCounterInterval);
  }
}

let job = new Job();

addEventListener('message', ({ data }) => {

  var entry = data as Workerinput;

  if (entry.order === Order.startRefresher)
    job.startRefresher(entry.refreshCounter);

  else if(entry.order === Order.stopAllTimers)
    job.stopAllTimers();

  else if(entry.order === Order.startIddle)
    job.startIddle(entry.iddleCounter);

  else if(entry.order === Order.resetIdle)
    job.resetIdle(entry.iddleCounter);

  else if(entry.order === Order.stopIddle)
    job.stopIdle();

  else if(entry.order === Order.startFinal)
    job.startFinal(entry.finalCounter);

});
