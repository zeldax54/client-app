import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  providers: [MessageService]
})
export class NumberComponent implements OnInit {

  numbervalid:boolean = false;
  number:string = '';


  constructor(private service: MessageService,private router: Router){

  }
  ngOnInit(): void {

  }

  startRegister()
  {
    const phoneNumberRegex = /^(?:\+|00)[1-9]\d{0,2}-?\d{1,4}-?\d{1,12}$/;
    if(phoneNumberRegex.test(this.number)){

      this.router.navigate(['/configure/qrcode']);
    }
    else
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Not valid Number' });
  }

}
