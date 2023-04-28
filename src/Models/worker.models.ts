export class Workerinput {
  order: Order | any;
  refreshCounter: number | any;
  iddleCounter: number | any;
  finalCounter: number | any;
}

export enum Order {
  startRefresher = "startRefresher",

  startIddle = "startIddle",
  stopIddle = "stopIddle",
  resetIdle = "reserIddle",
  stopAllTimers = "stopAllTimers",
  startFinal = "startFinal"
}

export enum EventMessage {
  iddleStart = "iddleStart",
  iddlefinalStart = "iddlefinalStart",
  tokenRefresh = "TokenRefresh",
  finishTick = "finishTick",

}
