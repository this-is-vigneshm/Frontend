import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { UpdateWorkOrderStatusReq } from 'src/app/models/UpdateWorkOrderStatusReq';

@Component({
  selector: 'app-updatewostatus',
  templateUrl: './updatewostatus.component.html',
  styleUrls: ['./updatewostatus.component.css']
})
export class UpdatewostatusComponent  implements OnInit{

  statusList = [
    "In progress",
    "Active",
    "Completed"
    ]

  @Input()
  workorderData: any;

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
      name: [null, [this.confirmationValidator]],
      userId: [null, [Validators.required]],
    })
    // this.employees = this.getAllEmployees();
  }

  ngOnInit(): void {
    this.userData = this.tokenService.getCurrentUserData()
  }

  submitForm(): void {
    if (this.form.valid) {
      if (this.form.value.status === "Closed") {
        console.log("Invalid Status Update");
      }else{
        console.log('submit', this.form.value);
        this.updateWorkOrderData(this.form.value)
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

  updateWorkOrderData(updateReq: any) {

    var workorderUpdate = new UpdateWorkOrderStatusReq(this.workorderData.orderNO, updateReq.status, updateReq.name,
      this.userData.userId);
    console.log(workorderUpdate);

    this.restApiService.updateWorkOrderStatus(workorderUpdate).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("WorkOrder updated Successfully!")
        this.close.emit()
      },
      error => {
        console.log(error)
        this.notification.error("Error updating status!")
      }
    )
  }

}




  