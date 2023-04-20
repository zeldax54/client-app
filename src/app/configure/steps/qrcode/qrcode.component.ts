import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  private hubConnection: signalR.HubConnection;
  public base64Image : string = '';

  constructor(){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(environment.notifierUrl)
    .build();
     this.hubConnection.start()
     .then(() => console.log('Conectado al hub'))
     .catch(error => console.error(error));
  }

  ngOnInit(): void {
    this.hubConnection.on('RegistrationQr', (base64: string) => {
      this.base64Image = base64;
    });
  }


}
