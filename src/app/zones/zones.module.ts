import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonesComponent } from './zones.component';
import { ZonesRoutingModule } from './zones-router.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ZonesComponent],
  imports: [
    CommonModule,
    ZonesRoutingModule,
    FormsModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule
  ]
})
export class ZonesModule { }
