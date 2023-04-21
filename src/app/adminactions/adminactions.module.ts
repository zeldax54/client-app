import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminactionsComponent } from './adminactions.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [AdminactionsComponent],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    ConfirmPopupModule,
    TableModule,
    ToggleButtonModule,


  ]
})
export class AdminactionModule {


}
