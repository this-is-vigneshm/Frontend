



import {
  Component,
  enableProdMode,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Inventory } from 'src/app/models/Inventory';
import { Resource } from 'src/app/models/Resource';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { differenceInCalendarDays } from 'date-fns';
import { delay } from 'rxjs';
enableProdMode();

interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-update-resource',
  templateUrl: './update-resource.component.html',
  styleUrls: ['./update-resource.component.css']
})
export class UpdateResourceComponent {
 
  @Input()
  resourceData!: Resource 

  @Output()
  close: EventEmitter<Resource> = new EventEmitter<Resource>

  validateForm!: UntypedFormGroup;

  today = new Date();
  disabledDate = (current: Date): boolean =>
  differenceInCalendarDays(current, this.today) < 0;


  startDate = new Date()
  disabledEndDate = (current: Date): boolean =>
  differenceInCalendarDays(current, this.startDate) < 0;

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NzMessageService,
    private restService: RestapiService,
    private router: Router,
    private tokenService: TokenService
  ) {
    
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.createresourceByData(this.validateForm.value);
    }
  }
  ngOnInit(): void {
    console.log(this.resourceData)
    this.validateForm = this.fb.group({
      resourceCode: [
        this.resourceData.resourceCode,
        [
          Validators.required,
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        ],
      ],
      resourceName: [
        this.resourceData.resourceName,
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      startDate: [this.resourceData.startDate, [Validators.required]],
      endDate: [this.resourceData.endDate, [Validators.required, Validators.pattern]],
    });
  }

  createresourceByData(resource: Resource) {
    resource.resourceId = this.resourceData.resourceId
    resource.resourceType = this.resourceData.resourceType
    resource.workOrderCode = this.resourceData.workOrderCode
    resource.availability = "Yes"
    resource.inventoryId = this.resourceData.inventoryId
    resource.userId = this.resourceData.userId;
    //restAPI CALL
    this.restService.updateResource(this.resourceData.resourceId, resource).subscribe(
      data=>{
        console.log("SuccessFully Updated", data)
      },
      error=>{
        console.log("Updation Failed", error)
      }
    )
  }


  handleClose() {
    setTimeout(function(){delay},10000)
  }

  handleReset() {
    this.validateForm.reset()
  }
}
