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
import { differenceInCalendarDays, setHours } from 'date-fns';
import { delay } from 'rxjs';
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
  close: EventEmitter<Resource[]> = new EventEmitter<Resource[]>();

  isUpdateComponent: boolean = true;

  validateForm!: UntypedFormGroup;
  userData: any;

  Atype = ['Yes', 'No'];

  inventory: any;
  @Input()
  workOrderCode: any;


  inventoryColumns: ColumnItem[] = [
    { name: 'Id' },
    { name: 'Name' },
    { name: 'Quantity' },
  ];

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

  resource : Resource[] = []
  createresourceByData(resource: Resource) {
    resource.resourceType = "Inventory"
    resource.workOrderCode = this.workOrderCode
    resource.availability = "Yes"
    for (var i of this.inventoryId) {
      resource.inventoryId = i
      resource.userId = null;
      this.restService.registerResource(resource).subscribe(
        (data) => {
          console.log('Success', data);
          this.notification.success('Resource Created Successfully.');
          this.resource.push( data.responseData)
        },
        (error) => {
          console.log('Error occcured', error);
        }
      );
    }
    this.handleClose()
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
    this.close.emit(this.resource)
  }
  a = false;
  inventoryId: number[] = []
  getId(event: any) {
    this.inventoryId.push(event)
  }

  handleReset() {
    this.validateForm.reset()
  }
}
