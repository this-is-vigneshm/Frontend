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
// import { Employee } from 'src/app/models/Employee';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
enableProdMode();

interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-createresource',
  templateUrl: './createresource.component.html',
  styleUrls: ['./createresource.component.css'],
})
export class CreateresourceComponent {
  restApiService: any;
  change($event: boolean) {
    throw new Error('Method not implemented.');
  }

  showSubmenu: boolean = false;

  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
  }

  @Input()
  resourceData!: Resource | null;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  isUpdateComponent: boolean = true;

  validateForm!: UntypedFormGroup;
  userData: any;

  Atype = ['Yes', 'No'];

  inventory: any;
  @Input()
  workOrderId :any;

  inventoryColumns: ColumnItem[] = [
    { name: 'Id' },
    { name: 'Name' },
    { name: 'Quantity' },
  ];

  disabledStartDate = (current: Date): boolean => {
    return current <= new Date();
  };

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NzMessageService,
    private restService: RestapiService,
    private router: Router,
    private tokenService: TokenService
  ) {
    if (this.resourceData == null) {
      this.validateForm = this.fb.group({
        workOrderId: [null, [Validators.required]],
        resourceId: [null, [Validators.required]],
        resourceName: [null, [Validators.required]],
        resourceType: [null, [Validators.required]],
        startDate: [null, [Validators.required]],
        endDate: [null, [Validators.required, Validators.pattern]],
        availability: [null, [Validators.required]],
        userId: [null, [Validators.required]],
      });
    } else {
      this.isUpdateComponent = true;
      this.validateForm = this.fb.group({
        resourceId: [this.resourceData.resourceId, [Validators.required]],
        resourceName: [this.resourceData.resourceName, [Validators.required]],
        resourceType: [this.resourceData.resourceType, [Validators.required]],
        startDate: [this.resourceData.startDate, [Validators.required]],
        endDate: [this.resourceData.endDate, [Validators.required]],
        resourceAvailability: [
          this.resourceData.availability,
          [Validators.required],
        ],
        userId: [this.resourceData.userId, [Validators.required]],
        workOrderId: [this.resourceData.workOrderId, [Validators.required]],
      });
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      if (!this.isUpdateComponent) {
        this.createresourceByData(this.validateForm.value);
      } else {
        this.updateresourceData(this.validateForm.value);
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigateByUrl('/signin');
      window.location.pathname = '/signin';
    }
    this.userData = this.tokenService.getCurrentUserData();
    this.getInventoryItem()
  }

  createresourceByData(resource: Resource) {
    resource.userId = this.userData.userId;
    this.restService.registerResource(resource).subscribe(
      (data: any) => {
        console.log('Success', data);
        this.notification.success('Resource Created Successfully.');
        this.router.navigateByUrl('/resourcelist');
        this.handleClose();
      },
      (error: any) => {
        console.log('Error occcured', error);
      }
    );
  }
  updateresourceData(resource: any) {
    console.log('Updating............');
    resource.userId = this.userData.userId;
    this.restService.updateResource(resource.id, resource).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('resource Updated Successfully.');
        this.router.navigateByUrl('/resource');
        this.handleClose();
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }

  inventoryItem : Inventory[] = []
  getInventoryItem(){
    this.restService.getItem().subscribe(
      (data:any)=>{
        this.inventoryItem=data.responseData
      },
      (error:any)=>
      {
        console.log('Error occcured', error);
      }
    )

  }

  handleClose() {
    this.isUpdateComponent = false;
    this.resourceData = null;
    this.close.emit();
  }
  id = null;
  a = false;
  getId(event: any) {
    console.log(event);
  }
}
