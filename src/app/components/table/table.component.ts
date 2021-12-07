import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  heads: string[] = ['Nama', 'Card Number', 'Expired Date', 'Operation']
  @Input() isChange:any;
  @Output() itemEvent = new EventEmitter<any>();
  payment: Payment[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  count = 0

  constructor(
    private paymentService: PaymentService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    }
    this.getPayment()
  }

  ngDoCheck(){
    if(this.isChange){
      console.log("CHECK EDIT");

      this.getPayment()
      this.isChange=false
    }
  }

  getPayment(){
    // this.paymentService.getPayment().subscribe(response => this.payment = response);
    this.paymentService
    .getPayment()
    .subscribe((res: any) => {
      if(res) this.payment = res
      if(this.count = 0){
        this.dtTrigger.next();
      }
      this.count++;
    },
    (err) => {
        alert(err);
        this.router.navigate(['/login'])
    })
  }

  // updatePayment(){
  //   this.paymentService.putEmployee(this.data.id,this.paymentForm.value).subscribe(
  //     (res) => {
  //       if (res.message) {
  //         alert(res.message);
  //         this.paymentForm.reset();
  //       }
  //     },
  //     (err) => {
  //         alert(err);
  //     }
  //   );
  // }

  deletePayment(id:number){
    this.paymentService.deletePayment(id).subscribe(
      (res) => {
        if (res.message) {
          // alert(res.message);
          this.openNotif(res.message)
          this.getPayment()
        }
      },
      (err) => {
          // alert(err);
          this.openNotif(err)
      }
    );
  }

  onEdit(dataParsing:any){
    console.log("UBAH");
    const dataEdit:any =
    {
      paymentDetailId: dataParsing.paymentDetailId,
      cardOwnerName: dataParsing.cardOwnerName,
      cardNumber: dataParsing.cardNumber,
      expirationDate: dataParsing.expirationDate,
      securityCode: dataParsing.securityCode,
      isEdit: true
    }
    this.itemEvent.emit(dataEdit)
  }

  openDialog(dataDialog:any){
    console.log(dataDialog);

    let dialogRef = this.dialog.open(DialogComponent,{data:{isDelete: true, Payment: dataDialog}});

    dialogRef.afterClosed().subscribe(result => {
      // this.getUsers();
      if(result === "Delete"){
        this.deletePayment(dataDialog.paymentDetailId)
      }else if(result === "Logout"){
        localStorage.removeItem('app_token')
        this.router.navigate(['/login'])
      }

    })
  }

  openNotif(dataDialog?:any){
    console.log(dataDialog);

    let dialogRef = this.dialog.open(DialogComponent,{data:{isNotif: true, notifikasi: dataDialog}});

    dialogRef.afterClosed().subscribe(result => {
      // this.getUsers();
    })
  }

  // this.payment.putPayment(this.updobj, result.id).subscribe(x => location.reload())


}
