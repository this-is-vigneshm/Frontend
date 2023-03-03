import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Facility } from 'src/app/models/Facility';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-create-facility',
  templateUrl: './create-facility.component.html',
  styleUrls: ['./create-facility.component.css']
})
export class CreateFacilityComponent implements OnInit{
  
  @Output()
  close : EventEmitter<any> = new EventEmitter();

  validateForm!: UntypedFormGroup;

  userData:any;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      facilityCode: [null, [Validators.required]],
      facilityName: [null, [Validators.required]],
      facilityType: [null, [Validators.required]],
      facilitySource: [null, [Validators.required]],
      inactiveDate: [null, []],
      facLocationCode: [null, []],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null, [Validators.required]],
      addressLine3: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      country: [null, [Validators.required]],
      dagRunId: [null, []],
      taskIdJobId: [null, []],
      crossCodeFlag: [false, []]
    });

    this.userData = this.tokenService.getCurrentUserData();
  }

  constructor(private fb: UntypedFormBuilder,
     private msg: NzMessageService, private restApiService: RestapiService,
      private router: Router, private notification : NzMessageService, private tokenService: TokenService) {}


      submitForm(): void {
        if (this.validateForm.valid) {
          console.log('submitted', this.validateForm.value);
          this.createFacility(this.validateForm.value)
        } else {
          Object.values(this.validateForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
      }

      createFacility(facility : Facility){
        facility.userId = this.userData.userId;
        this.restApiService.createFacility(facility).subscribe(
          data=> {
            console.log("Success", data);
            this.notification.success("Facility Addded Successfully!")
            this.handleCloseEvent();
          },
          error =>{
            console.log("Error occured", error);
            this.notification.error("Facility Addition Failure!")
          }
        )
      }

      handleCloseEvent(){
        this.close.emit()
      }

}
