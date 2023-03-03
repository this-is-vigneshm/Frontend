import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TicketResp } from 'src/app/models/TicketResp';
import { UpdateStatusReq } from 'src/app/models/UpdateStatusReq';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';





@Component({
  selector: 'app-update-ticket-status',
  templateUrl: './update-ticket-status.component.html',
  styleUrls: ['./update-ticket-status.component.css']
})
export class UpdateTicketStatusComponent implements OnInit {

  statusList = [
    "Open",
    "In Progress",
    "Resolved",
    "Closed"
  ]

  @Input()
  ticketData: any;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  userData: any;

  form: UntypedFormGroup;

  employees: any = [];


  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    // if (!control.value) {
    //   return { required: true };
    // } else if (control.value !== this.form.controls['password'].value) {
    //   return { confirm: true, error: true };
    // }
    // if(this.form.controls['status'].value === "Closed"){
    //   return {required:true}
    // }
    return {};
  };

  constructor(private formBuilder: UntypedFormBuilder, private notification: NzMessageService,
    private restApiService: RestapiService, private router: Router, private tokenService: TokenService) {
    this.form = this.formBuilder.group({
      status: ["Open", [Validators.required]],
      amountSpent: [null, [this.confirmationValidator]],
      assignedTo: [null, [Validators.required]],
    })
    this.employees = this.getAllEmployees();
  }

  ngOnInit(): void {
    this.userData = this.tokenService.getCurrentUserData()
  }

  submitForm(): void {
    if (this.form.valid) {
      if (this.form.value.status === "Closed" && this.form.value.amountSpent === null) {
        console.log("Invalid Status Update");
        this.notification.warning("Amount spent should be entered for closing the ticket")
      }else{
        console.log('submit', this.form.value);
        this.updateTicketData(this.form.value)
      }
     
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  getAllEmployees() {
    this.restApiService.getEmployees().subscribe(
      data => {
        this.employees = data.responseData;
        console.log("Employee Data Found", data);
      },
      error => {
        this.notification.error("Employee Fetching failed!")
        console.log("Error Occurred", error);
      }
    )
  }

  updateTicketData(updateReq: any) {

    var ticketUpdate = new UpdateStatusReq(this.ticketData.uuid, updateReq.status, updateReq.amountSpent,
      this.userData.userId, updateReq.assignedTo);
    console.log(ticketUpdate);

    this.restApiService.updateTicketStatus(ticketUpdate).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Ticket updated Successfully!")
        this.close.emit()
      },
      error => {
        console.log(error)
        this.notification.error("Error updating status!")
      }
    )
  }
}
