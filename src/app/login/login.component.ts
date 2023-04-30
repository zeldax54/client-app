import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { LoginService } from './login.service';
import { catchError, throwError } from 'rxjs';
import { IdentityResponse } from 'src/Models/identityresponse';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { SessiontimeService } from '../shared/sessiontime/sessiontime.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class LoginComponent implements OnInit{


  rememberme: boolean = false;

  password!: string;
  email!:string;
  msgs: Message[] = [];

  constructor(public layoutService: LayoutService,private loginService:LoginService,private router:Router, private sessionTimerService : SessiontimeService){
  }
  ngOnInit(): void {
    this.sessionTimerService.stopAllTimers();
  }

  login(){
    this.loginService.login(this.email,this.password).pipe(
      catchError((error) => {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Error', detail: '' });
        return throwError(()=>{new Error(error)});
      })
    )
     .subscribe((response:IdentityResponse)  => {
    if(response.statusCode != 200){
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: response.errorMessage });
     }
     if(response.statusCode == 200){
      localStorage.setItem('token',response.data.item1)
      localStorage.setItem('x-nameidentifier',response.data.item2)
      this.sessionTimerService.resetSession();
      this.router.navigate(['/home']);
      }
    });
  }
}
