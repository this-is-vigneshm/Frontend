import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Facility } from 'src/app/models/Facility';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-create-facility',
  templateUrl: './create-facility.component.html',
  styleUrls: ['./create-facility.component.css'],
})
export class CreateFacilityComponent implements OnInit {
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  @Input()
  facilityData!: Facility | null

  validateForm!: UntypedFormGroup;

  isUpdateComponent: boolean = false;

  userData: any;

  addLoc: boolean = true;

  facilityType = [{ name: 'Rural' }, { name: 'Urban' }];

  ngOnInit(): void {
    if(this.facilityData == null){
      this.validateForm = this.fb.group({
      facilityCode: [
        null,
        [Validators.required, Validators.pattern('[A-Z][A-Z ]+')],
      ],
      facilityName: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      facilityType: [null, [Validators.required]],
      facilitySource: [null, [Validators.required]],
      inactiveDate: [null, []],
    });
    } else {
      this.isUpdateComponent = true;
      this.validateForm = this.fb.group({
        facilityCode: [this.facilityData.facilityCode, [Validators.required]],
        facilityName: [this.facilityData.facilityName, [Validators.required]],
        facilityType: [this.facilityData.facilityType, [Validators.required]],
        facilitySource: [this.facilityData.facilitySource, [Validators.required]],
        inactiveDate: [ this.facilityData.inactiveDate,[Validators.required, Validators.pattern],],
      });
    }

    this.userData = this.tokenService.getCurrentUserData();
  }

  constructor(
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private restApiService: RestapiService,
    private router: Router,
    private notification: NzMessageService,
    private tokenService: TokenService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submitted', this.validateForm.value);
      this.createFacility(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  facCode!: Facility | null;

  createFacility(facility: Facility) {
    facility.userId = this.userData.userId;
    this.restApiService.createFacility(facility).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('Facility Addded Successfully!');
        this.facCode = data.responseData;
        this.handleCloseEvent();
        this.addLoc = false;
      },
      (error) => {
        console.log('Error occured', error);
        this.notification.error('Facility Addition Failure!');
      }
    );
  }

  handleCloseEvent() {
    this.close.emit();
  }
  loc: boolean = false;
  forLocation(event: MouseEvent) {
    event.preventDefault();
    this.loc = !this.loc;
  }
  size: NzButtonSize = 'small';
}
