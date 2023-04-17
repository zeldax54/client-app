import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../login/login.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.loginservice.isLoggedIn().then(isLogginExpired=>{
        if(isLogginExpired == true){
          this.router.navigate(['login']);
          resolve(false);
        }
        else
        resolve(true);
      })

    });
  }
}
