import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './qrcode.component';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [QrcodeComponent],
  imports: [
    CommonModule,
    ImageModule
  ]
})
export class QRCodeModule { }
