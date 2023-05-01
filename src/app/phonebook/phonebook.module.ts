import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonebookComponent } from './phonebook.component';
import { PhoneBookRoutingModule } from './phonebook-router.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [PhonebookComponent],
  imports: [
    CommonModule,
    PhoneBookRoutingModule,
    FormsModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    DropdownModule,
    DividerModule
  ],
  providers:[MessageService]
})
export class PhoneBookModule { }
