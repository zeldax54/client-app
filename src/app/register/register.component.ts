import { Component } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { RegisterService } from './register.service';
import { IdentityResponse } from 'src/Models/identityresponse';
import { Message, MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {


  password!: string;
  email!:string;
  name!:string;
  lastname!:string;

  isInputValid:boolean = false;

  password8char:boolean = false;
  upperCharacter : boolean = false;
  lowercaseCharacter : boolean = false;
  symbol : boolean = false;
  numberchar:boolean = false;

  msgs: Message[] = [];

  constructor(public layoutService: LayoutService,private registerService:RegisterService,private router:Router){
  }


   validateForm(){
    const regex = /^[a-zA-Z]+$/;
    let nametest = regex.test(this.name) && regex.test(this.lastname);
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailTest= emailregex.test(this.email);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    let passwordTest = passwordRegex.test(this.password);
    this.isInputValid = nametest && emailTest && passwordTest;
  }

   registerUser(){

    this.registerService.register(this.name,this.lastname,this.email,this.password)
    .pipe(
      catchError((error) => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Somethin went wrong' });
        return throwError(()=>{new Error(error)});
      })
    )
     .subscribe((response:IdentityResponse)  => {
    if(response.statusCode != 200){
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: response.errorMessage });
    }
     if(response.statusCode == 200){
      this.msgs = [];
       this.msgs.push({ severity: 'success', summary: 'Success', detail: response.data+'. Will be redirected to login.' });
       setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
      }
    });
  }

  checkPassword(){
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const caracteresEspeciales = '!@#$%^&*()-=_+[]{}|;:,.<>?/';
    const numeros = '0123456789';

    let ppassword8char = false;
    let pupperCharacter  = false;
    let plowercaseCharacter  = false;
    let psymbol  = false;
    let pnumberchar = false;

    for (let i = 0; i < this.password.length; i++) {
      const char = this.password[i];
      if (numeros.includes(char)) {
        pnumberchar = true;
      }
      else if (minusculas.includes(char)) {
        plowercaseCharacter = true;
      } else if (mayusculas.includes(char)) {
        pupperCharacter = true;
      } else if (caracteresEspeciales.includes(char)) {
        psymbol = true;
      }
    }
    ppassword8char = this.password.length >= 8;

    this.password8char = ppassword8char;
    this.upperCharacter = pupperCharacter;
    this.lowercaseCharacter = plowercaseCharacter;
    this.symbol = psymbol;
    this.numberchar = pnumberchar;
  }

}
