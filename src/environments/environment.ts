// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  userApi:"https://localhost:7016/",
  userApidoman:"localhost:7016",

  appApi:"https://localhost:7149/",
  appApiDoman:"localhost:7149",
  notifierUrl:"https://localhost:7149/notifier",

  refresherTime:20,//minutes
  logtimeUntilRefresh:false,

  iddleTime:10,
  iddleFinal:5,
  logIddleTimers:false
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
