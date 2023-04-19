import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureComponent } from './configure.component';
import { ConfigureRoutingModule } from './configure-routing.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [ConfigureComponent],
  imports: [
    CommonModule,
    ConfigureRoutingModule,
    TabMenuModule,
		StepsModule,
    TableModule,
    ToggleButtonModule

  ]
})
export class ConfigureModule { }
