import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { CountryModel } from 'src/Models/BussinessModel/CountryModel';
import { ZoneModel } from 'src/Models/BussinessModel/ZoneModel';

import { PhoneBookModel } from 'src/Models/BussinessModel/PhoneBookModel';
import { HelperService } from '../helpers/services/helper.service';
import { ZonesService } from '../zones/zones.service';
import { PhonePrefix } from 'src/Models/BussinessModel/PhonePrefix';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss'],
})
export class PhonebookComponent implements OnInit {

  countries:CountryModel[]=[];
  headerTile: string = '';
  cols: any[] = [];
  phonebooks: PhoneBookModel[] = [];
  selectedPhonebooks: PhoneBookModel[] = [];
  phonebook: PhoneBookModel = {};
  phonebookDialog: boolean = false;
  submitted: boolean = false;
  deletePhoneBookDialog: boolean = false;
  deletePhoneBooksDialog: boolean = false;
  selectedMulti: any[] = [];
  selectedCountry:CountryModel={};
  zones:ZoneModel[]=[];
  selectedZone:ZoneModel={};
  prefixs : PhonePrefix[]=[];
  selectedPrefix:PhonePrefix={};

  constructor( private helperService: HelperService,private zonesService:ZonesService){}


  ngOnInit(): void {

    this.headerTile = $localize`${'Add a person to your PhoneBook'}`;

     this.helperService.countries().pipe().subscribe(response=>{
      this.countries = response;
      this.prefixs = response.map(c => ({ CountryCode : c.Code, Prefix : c.PhonePrefix,CountryName : c.Name }));
     });

     this.zonesService.getZones().subscribe(response=>{
      this.zones = response;
     });

     this.cols = [
      { field: 'Name', header: $localize`${'Name'}` },
      { field: 'LastName', header: $localize`${'LastName'}` },
      { field: 'Country', header: $localize`${'Country'}` },
      { field: 'Zone', header: $localize`${'Zone'}` },

    ];
  }

  openNew(){
    this.phonebook = {};
    this.submitted = false;
    this.phonebookDialog = true;
  }

  deleteSelectedPhoneBook(){}
  onGlobalFilter(table: Table, event: Event){}
  editPhoneBook(phonebook:PhoneBookModel){}
  deletePhoneBook(phonebook:PhoneBookModel){}
  hideDialog(){}
  savePhoneBook(){}

}
