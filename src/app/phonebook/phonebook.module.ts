import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonebookComponent } from './phonebook.component';
import { PhoneBookRoutingModule } from './phonebook-router.module';



@NgModule({
  declarations: [PhonebookComponent],
  imports: [
    CommonModule,
    PhoneBookRoutingModule,
  ]
})
export class PhoneBookModule { }
