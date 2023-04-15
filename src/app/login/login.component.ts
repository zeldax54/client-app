import { Component } from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class LoginComponent {


  valCheck: string[] = ['remember'];

  password!: string;
  email!:string;

  constructor(public layoutService: LayoutService){

  }

}
