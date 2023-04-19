import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NumberComponent } from './number.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';




@NgModule({
  declarations: [NumberComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
		RippleModule,
    ToastModule,
    InputMaskModule
  ]
})
export class NumberModule { }
