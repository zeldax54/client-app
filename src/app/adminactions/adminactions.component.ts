import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { WConfigureService } from '../configure/wconfigure.service';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from 'src/Models/apiresponse';

@Component({
  selector: 'app-adminactions',
  templateUrl: './adminactions.component.html',
  styleUrls: ['./adminactions.component.scss'],
  providers: [MessageService]
})
export class AdminactionsComponent implements OnInit {

  tableData: any[] = [];

constructor(private messgeService: MessageService,private configureService : WConfigureService, private confirmationService:ConfirmationService){
}
  ngOnInit(): void {

         /*Hacer esto con States*/
         this.configureService.list().pipe().subscribe(result=>{
          this.tableData = result.data;
         });

  }

clean(){
  this.configureService.clean()
  .pipe(
    catchError((error) => {
      this.messgeService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: 'Error' });
      return throwError(()=>{new Error(error)});
    })
  )
   .subscribe((response:ApiResponse)  => {
    this.messgeService.add({ key: 'tst', severity: 'info', summary: 'Info', detail: response.data });
  });
 }

  confirmclean(event: Event) {
    this.confirmationService.confirm({
        key: 'confirmLogoff',
        target: event.target || new EventTarget,
        message: 'Are you sure that you want clean the build?',
        icon: 'pi pi-exclamation-circle',
        accept: () => {
            this.clean();
        },
        reject: () => {

        }
    });
}


confirmdelete(event:Event,id:any){
  this.confirmationService.confirm({
    key: 'confirmLogoff',
    target: event.target || new EventTarget,
    message: 'Are you sure that you want clean the build?',
    icon: 'pi pi-exclamation-circle',
    accept: () => {
        this.delete(id);
    },
    reject: () => {

    }
});
}

delete(id:Number){
 this.configureService.removeRegister(id).pipe().subscribe(response=>{
  this.messgeService.add({ key: 'tst', severity: 'info', summary: 'Info', detail: response.data });
 })
}

}
