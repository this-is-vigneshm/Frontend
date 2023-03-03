import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OutletContext, Router } from '@angular/router';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee } from 'src/app/models/Employee';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{

  @Output()
  close :EventEmitter<any> = new EventEmitter<any>()


  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  departList = [
    "d1",
    "d2",
    "d3"
  ]

  desList = [
    "Service Analyst",
    "Analyst"
  ]

  userList = [
    "User",
    "Vendor",
    "Contract"
  ]

  rpList = [
    "YES",
    "NO"
  ]

  rolesList = [
    ["Admin"],
    ["Developer"]
    ]


  constructor(private fb: UntypedFormBuilder, private msg: NzMessageService, private restApiService: RestapiService, private router: Router) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submitted', this.validateForm.value);
      this.createEmployee(this.validateForm.value)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      department: [null, [Validators.required]],
      designation: [null, [Validators.required]],
      roles:[["ADMIN"]],
      address: [null, [Validators.required]],
      location: [null, [Validators.required]],
      usertype: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      resourceplanner: [null,[Validators.required]],
      agree: [false, Validators.requiredTrue],
    });
  }

  createEmployee(employee : Employee){
    this.restApiService.registerEmployee(employee).subscribe(
      data=>{
        console.log("Success", data)
        this.msg.success("Employee Registered Successfully!")
        this.close.emit();
      },
      error=>{
        console.log("Error occcured", error)
        this.msg.error("Employee Creation Failed. Check Console.")
      }
    );
  }
}
