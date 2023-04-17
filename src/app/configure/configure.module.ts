import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureComponent } from './configure.component';
import { ConfigureRoutingModule } from './configure-routing.module';

@NgModule({
  declarations: [ConfigureComponent],
  imports: [
    CommonModule,
    ConfigureRoutingModule
  ]
})
export class ConfigureModule { }
