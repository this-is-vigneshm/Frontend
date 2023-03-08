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
import { Employee } from 'src/app/models/Employee';
import { Resource } from 'src/app/models/Resource';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { differenceInCalendarDays, setHours } from 'date-fns';


enableProdMode();

interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-resourceplanner',
  templateUrl: './resourceplanner.component.html',
  styleUrls: ['./resourceplanner.component.css'],
})
export class ResourceplannerComponent implements OnInit {
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

  isUpdateComponent: boolean = true;

  validateForm!: UntypedFormGroup;
  userData: any;

  Atype = ['Yes', 'No'];
  employees: Employee[] = [];

  isusers: boolean = false;

  @Input()
  workOrderCode :any;

  @Output()
  close1: EventEmitter<number> = new EventEmitter<number>();


  ColumnItem: any;

  employeeColumns: ColumnItem[] = [
    { name: 'Id' },
    { name: 'Email' },
    { name: 'UserName' },
    { name: 'Phone Number' },
    { name: 'Department' },
    { name: 'Designation' },
  ];

  users = [
    'Employee',
    'Vendor',
  'Contractor'
  ];

  selectedUser: any;
  selectedItem: any;
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
    if (this.resourceData == null) {
      this.validateForm = this.fb.group({
        workOrderId: [null, [Validators.required]],
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
        resourceType: [],
        startDate: [null, [Validators.required]],
        endDate: [null, [Validators.required, Validators.pattern]],
        availability: [null, [Validators.required]],
        // userId: [null, [Validators.required]],
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
        workOrderId: [this.resourceData.workOrderCode, [Validators.required]],
      });
    }
  }

  submitForm(): void {
    this.createresourceByData(this.validateForm.value);
  }
  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigateByUrl('/signin');
      window.location.pathname = '/signin';
    }
    this.userData = this.tokenService.getCurrentUserData();
  
  }
 data = false
  onCh(type: any): void{
    this.restService.getEmployeesByTypes(type).subscribe(
      (data) => {
        console.log('Success', data);
        this.employeeList = data.responseData;
        this.searchResults = this.employeeList;
        this.notification.success('Employee Details is Found!');
        this.data = true
        console.log(this.data)
      },
      (error) => {
        console.log('Error occurred', error);
        this.notification.error('Error getting the employee Details!');
        this.data = false
      }
    );

  }


  createresourceByData(resource: Resource) {
    resource.workOrderCode = this.workOrderCode
    resource.resourceType = 'User';
    for(var i of this.userId){
      resource.userId = i
      this.restService.registerResource(resource).subscribe(
        (data: any) => {
          console.log('Success', data);
          this.notification.success('Resource Created Successfully.');
          this.handleClose();
        },
        (error: any) => {
          console.log('Error occcured', error);
        }
      );}
    
  }
  updateresourceData(resource: any) {
    console.log('Updating............');
    resource.userId = this.userData.userId;
    this.restService.updateResource(resource.id, resource).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('resource Updated Successfully.');
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }

  handleClose() {
    this.isUpdateComponent = false;
    this.resourceData = null;
    console.log("close")
    this.close1.emit(this.workOrderCode);
  }

  employeeList: any = [];
  searchString: any;
  searchResults: any = [];

 user : any
  userId : number[] = []
  onCheck(event: any) {
    this.userId.push(event)
  }
  handleReset()
  {
    this.validateForm.reset()
  }
}
