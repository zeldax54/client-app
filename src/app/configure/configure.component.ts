import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { WConfigureService } from './wconfigure.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  constructor(public layoutService: LayoutService, private configureService: WConfigureService){
  }
  ngOnInit(): void {

   this.configureService.configure('0018137096526').pipe().subscribe(response=>{
      console.log(response);
    });

  }
}
