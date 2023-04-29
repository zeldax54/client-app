import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
      this.model = [
        {
          label:  $localize `${'Home'}`,
          items: [
              {
                  label: $localize `${'Home'}`,
                  icon: 'pi pi-fw pi-home',
                  routerLink: ['/home']
              }
          ]
      },
        {
            label: $localize `${'Configure'}`,
            items: [
                {
                    label:  $localize `${'Phonebook'}`,
                    icon: 'pi pi-fw pi-phone',
                    routerLink: ['/phonebook']
                },
                {
                  label:  $localize `${'Address Book'}`,
                  icon: 'pi pi-fw pi-envelope',
                  routerLink: ['/configure/number']
              }
            ]
        },

        {
          label: 'Admin Actions',
          items: [
              {
                  label: 'Admin Actions',
                  icon: 'pi pi-fw pi-lock',
                  routerLink: ['/adminactions']
              }
          ]
      }

    ];
    }
}
