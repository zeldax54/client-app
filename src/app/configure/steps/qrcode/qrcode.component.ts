import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  private hubConnection: signalR.HubConnection;
  public base64Image : string = '';
  title:string = 'Please Scan QR code below';

  constructor(private spinnerService : SpinnerService){
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
      this.spinnerService.hide();
    });
    this.hubConnection.on('RegistrationEndTest', (base64: string) => {
      this.title = 'Process End';
      this.base64Image = base64;
    });
  }


}
