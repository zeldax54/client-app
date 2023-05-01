import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { CountryModel } from 'src/Models/BussinessModel/CountryModel';
import { PhoneBookModel } from 'src/Models/BussinessModel/PhoneBookModel';
import { HelperService } from '../helpers/services/helper.service';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss'],
})
export class PhonebookComponent implements OnInit {

  constructor( private helperService: HelperService){}

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


  ngOnInit(): void {

     this.helperService.countries().pipe().subscribe(response=>{
      this.countries = response;
     })
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
