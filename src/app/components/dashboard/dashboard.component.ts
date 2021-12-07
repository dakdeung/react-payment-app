import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isChange: boolean = false
  isEdit: boolean = false
  data: any
  constructor(public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
  }

  changeEvent(change:boolean){
    this.isChange = change;

  }

  itemEvent(payment: Payment, bool: boolean){
    console.log("UBAH2" + payment.cardOwnerName);
    this.data = payment;
    console.log(payment.paymentDetailId);

    this.isEdit = bool;
  }

  openDialog(dataDialog?:any){
    console.log(dataDialog);

    let dialogRef = this.dialog.open(DialogComponent,{data:{isDelete: false, Payment: dataDialog}});

    dialogRef.afterClosed().subscribe(result => {
      // this.getUsers();
      if(result === "Delete"){

      }else if(result === "Logout"){
        localStorage.removeItem('app_token')
        this.router.navigate(['/login'])
      }

    })
  }
}
