/// <reference lib="webworker" />

import { environment } from "src/environments/environment";

class Workerinput {
  order: Order | any;
  refreshCounter: number | any;
  iddleCounter: number | any;
}

enum Order {
  startRefresher = "startRefresher",
  startIddle = "resetIddle",
  resetRefresher = "reserRefresher",
  resetIdle = "reserIddle",
  stopAllTimers = "stopAllTimers"
}

enum EventMessage {
  iddleFinsh = "iddleReach",
  tokenRefresh = "TokenRefresh"
}

class PostMessage {
  event: EventMessage | any;
  seconds: number | any;
}

class Job {
  refresherCounterInterval: any;
  refresherCounter: number = 0;

  IddleCounterTimeOut : number = 0;
  IddleCounter: number = 0;
  IddleRemaining: number = 0;



  startRefresher(refresherTime: number) {

    clearInterval(this.refresherCounterInterval);

    this.refresherCounterInterval = setInterval(_ => {

      this.refresherCounter += 1;

      let untilRefresh = refresherTime - this.refresherCounter;

      if(environment.logtimeUntilRefresh)
         console.log('seconds ultil refresh',untilRefresh)

      if(untilRefresh <= 0){
        this.refresherCounter = 0;
        postMessage({ event: EventMessage.tokenRefresh, seconds: this.refresherCounter });
        clearInterval(this.refresherCounterInterval);
      }

    }, 1000);
  }

  stopAllTimers(){
    clearInterval(this.refresherCounterInterval);
    this.refresherCounter = 0;
    clearTimeout(this.IddleCounterTimeOut);
    this.IddleCounter = 0;
    this.IddleRemaining = 0;
  }
}

let job = new Job();

addEventListener('message', ({ data }) => {
  var entry = data as Workerinput;
  if (entry.order == Order.startRefresher) {
    job.startRefresher(entry.refreshCounter);
  }
  if(entry.order == Order.stopAllTimers){
    job.stopAllTimers();
  }
});
