import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Locations } from 'src/app/models/locations';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  a:any
  userData:any

  @Input()
  facCode:any

  ngOnInit(): void {
    console.log(this.facCode.facilityName)
    this.userData = this.tokenService.getCurrentUserData();
    this.validateForm = this.fb.group({
      name: [
        null,
        [
          Validators.required,
        ],
      ],description: [
        null,
        [
          Validators.required,
        ],
      ],


      addressLine1: [
        null,
        [
          Validators.required,
          // Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
        ],
      ],
      addressLine2: [
        null,
        [
          Validators.required,
        ],
      ],
      addressLine3: [
        null,
        [
          Validators.required,
        ],
      ],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      country: [null, [Validators.required]],

    });

  }
  constructor(
    private fb: UntypedFormBuilder, private restApi : RestapiService, private notification : NzMessageService, private tokenService:TokenService
  ) {}
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submitted', this.validateForm.value);
      this.handleLocationCreate(this.validateForm.value)
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
locId : any
  handleLocationCreate(location : Locations){
    location.facCode=this.facCode.facilityCode
    location.userId = this.userData.userId;
    this.restApi.createLocation(location).subscribe(
      data=>{
        console.log('Success', data)
        this.notification.success('Location Created Successfully')
        this.loc = true
        this.locId = data.responseData.id
      },
      error=>{
        console.log("Failed", error)
        this.notification.error('Failed')
      }
      
    )
  }

  loc:boolean = false

}
