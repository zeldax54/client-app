export class Workerinput {
  order: Order | any;
  refreshCounter: number | any;
  iddleCounter: number | any;
  finalCounter: number | any;
}

export enum Order {
  startRefresher = "startRefresher",

  startIddle = "startIddle",
  resetIdle = "reserIddle",

  stopAllTimers = "stopAllTimers"
}

export enum EventMessage {
  iddleStart = "iddleStart",
  iddlefinalStart = "iddlefinalStart",
  tokenRefresh = "TokenRefresh"
}
