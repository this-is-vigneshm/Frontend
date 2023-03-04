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
  close: EventEmitter<number> = new EventEmitter<number>();

  isUpdateComponent: boolean = true;

  validateForm!: UntypedFormGroup;
  userData: any;

  Atype = ['Yes', 'No'];

  inventory: any;
  @Input()
  workOrderId: any;


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
    this.validateForm = this.fb.group({
      resourceCode: [
        null,
        [
          Validators.required,
          Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        ],
      ],
      resourceName: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required, Validators.pattern]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.createresourceByData(this.validateForm.value);
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
    resource.resourceType = "Inventory"
    resource.workOrderId = this.workOrderId
    resource.availability = "Yes"
    for (var i of this.inventoryId) {
      resource.userId = null;
      this.restService.registerResource(resource).subscribe(
        (data) => {
          console.log('Success', data);
          this.notification.success('Resource Created Successfully.');
          this.handleClose()
        },
        (error) => {
          console.log('Error occcured', error);
        }
      );
    }
  }


  inventoryItem: Inventory[] = []
  getInventoryItem() {
    this.restService.getItem().subscribe(
      (data: any) => {
        this.inventoryItem = data.responseData
      },
      (error: any) => {
        console.log('Error occcured', error);
      }
    )

  }

  handleClose() {
    this.isUpdateComponent = false;
    this.resourceData = null;
    this.close.emit(this.workOrderId);
  }
  a = false;
  inventoryId: number[] = []
  getId(event: any) {
    this.inventoryId.push(event)
    console.log(this.inventoryId)
  }
  handleReset() {
    this.validateForm.reset()
  }
}
