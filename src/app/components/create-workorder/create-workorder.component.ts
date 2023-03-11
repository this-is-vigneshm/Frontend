import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { WorkOrder } from 'src/app/models/WorkOrder';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Employee } from 'src/app/models/Employee';
import { Resource } from 'src/app/models/Resource';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';




interface ColumnItem {
  name: string;
}

@Component({
  selector: 'app-create-workorder',
  templateUrl: './create-workorder.component.html',
  styleUrls: ['./create-workorder.component.css']
})
export class CreateWorkorderComponent implements OnInit {

  loading = false;
  avatarUrl?: string;



  statusTypes = [
    "In Progress",
    "Active",
    "Completed"
  ]


  @Input()
  workOrderData! : WorkOrder | null;

  size: 'large' | 'small' | 'default' = 'default';

  @Input()
  ticketid = ""

  @Output()
  close: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  done : EventEmitter<Map<string, number>> = new EventEmitter<Map<string, number>>();

  isUpdateComponent: boolean = false

  userData: any


  validateForm!: UntypedFormGroup;

  employees: Employee[] = []

  name: any
  emailId: any
  phNo: any
  file: File | null = null;
  userName: string[] = []

  getEmployees(id: number) {
    console.log(id)
    this.restService.getEmployeeById(id).subscribe(
      data => {
        var user = data.responseData;
        this.notification.success("Fetched")
        this.name = user.name
        this.emailId = user.email
        this.phNo = user.phoneNumber

      },
      error => {
        console.log("Error Occured", error);
        this.notification.error("User Fetching Failed")
      }
    )

  }
  submitForm(): void {
    if (this.validateForm.valid) {
      if (!this.isUpdateComponent) {
        // this.createItemByData(this.validateForm.value)
        this.handleCreation()
      }
      // else{
      //   this.updateItemData(this.validateForm.value)
      // }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  constructor(private fb: UntypedFormBuilder, private notification: NzMessageService, private restService: RestapiService,
    private router: Router, private location: Location, private tokenService: TokenService, private msg: NzMessageService, private modal: NzModalService) { }

  uuid: any

  form!: any;

  condition: boolean = false

  condition1: boolean = false

  selectedResource!: Resource | null;

  isVisibleMiddle = false;

  isa = false;

  ngOnInit(): void {
    if (localStorage.getItem("access_token") === null) {
      this.router.navigateByUrl("/signin");
      window.location.pathname = "/signin"
    }
    this.userData = this.tokenService.getCurrentUserData()
    console.log(this.userData)
    this.getEmployees(this.userData.userId)

    if (this.workOrderData == null) {
      this.validateForm = this.fb.group({
        status: ["In Progress"],
        workOrderCode :  [null, [Validators.required,]],
        description: [null, [Validators.required, Validators.maxLength(200)]],
        workSubject: [null, [Validators.required,]],
        taskDetails: [null, [Validators.required,]],
        workOrderCost: [null, [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
        date: [null, [Validators.required]],
      });
    }
    else{
      this.validateForm = this.fb.group({
        status: ["In Progress"],
        workOrderCode :  [this.workOrderData.workOrderCode, [Validators.required,]],
        description: [this.workOrderData.description, [Validators.required, Validators.maxLength(200)]],
        workSubject: [this.workOrderData.workSubject, [Validators.required,]],
        taskDetails: [this.workOrderData.taskDetails, [Validators.required,]],
        workOrderCost: [this.workOrderData.workOrderCost, [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
        date: [this.workOrderData.date, [Validators.required]],
      });
    }

  }
  code : any

  createItemByData(workorder: WorkOrder, file: File) {
    workorder.employeeId = this.userData.userId
    workorder.status = "Active"
    workorder.emailId = this.emailId
    workorder.phoneNumber = this.phNo
    workorder.name = this.name
    this.restService.registerWo(workorder, file).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Workorder Created Successfully.")
        this.getHello(data.responseData.workOrderCode)
      },
      error => {
        console.log("Error occcured", error)
      }
    );
  }
  isb = false
  resourcesUser: Resource[] = [];
  resourcesInventory: Resource[] = [];
  searchResults: any
  
  handleUpdateResource(data: any) {
    this.selectedResource = data;
    this.isVisibleMiddle = true;
  }


  handleCreateResourceSave(id : any): void {
    console.log(id)
    this.selectedResource = null;
    this.isVisibleMiddle = false;
    this.resourcesUser = id
    this.condition = true
  }

  handleCreateResourceSave1(id : any): void {
    console.log(id)
    this.selectedResource = null;
    this.isVisibleMiddle = false;
    this.resourcesInventory = id
    this.condition1 = true
  }

  handleCreateResourceCancel(): void {
    this.selectedResource = null;
    this.isVisibleMiddle = false;
  }


  handleClose() {
    this.isUpdateComponent = false;
    this.workOrderData = null;
    this.close.emit();
  }
  handleChange(event: any) {
    this.file = event.target.files[0]
  }
  handleCreation() {
    var formData = this.validateForm.value
    if (this.file == null) {
    } else {
      this.createItemByData(formData, this.file)
    }

  }

  a: any;
  isVisible = false;
  isConfirmLoading = false;

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  clickevent(event: any) {
    this.restService.getEmployeeByName(event).subscribe(
      data => {
        this.employees[0] = data.responseData;
        this.notification.success("User fetched")
      },
      error => {
        console.log("Error Occured", error);
        this.notification.error("User Fetching Failed")
      }
    )
    this.name = this.employees[0].email
    this.phNo = this.employees[0].phoneNumber
  }

  handleCancel(): void {
    this.isVisible = false;
  }



  changeA(event : MouseEvent) {
    this.isa = true
    this.isb = false
    this.isVisibleMiddle = true;
    event.preventDefault()
  }
  changeB(event : MouseEvent) {
    this.isa = false
    this.isb = true
    this.isVisibleMiddle = true;
    event.preventDefault()
  }

  isClick = false
  getCaptcha(event: MouseEvent) {
    console.log(event)
    this.isClick = !this.isClick
    event.preventDefault()
  }
  map : Map<string, number> = new Map



  getHello(code : any)
  {
    this.map.set(this.ticketid, code)
    this.done.emit(this.map)
  }

  today = new Date();

  disabledDate = (current: Date): boolean =>
  differenceInCalendarDays(current, this.today) < 0;

  listOfColumns: ColumnItem[] = [
    {
      name: 'resourceCode',
    },
    {
      name: 'resourceName',
    },
    {
      name: 'availability',
    },
    {
      name: 'startDate',
    },
    {
      name: 'endDate',
    },
    {
      name: 'userId'
    },
  ]; 
  listOfColumns1: ColumnItem[] = [
    {
      name: 'resourceCode',
    },
    {
      name: 'resourceName',
    },
    {
      name: 'availability',
    },
    {
      name: 'startDate',
    },
    {
      name: 'endDate',
    },
    {
      name: 'inventoryId'
    },
  ];
  deleteById(resourceId: any) {
    this.restService.deleteById(resourceId).subscribe(
      (data) => {
        this.notification.success('Resource Deleted Successfully.!');
        window.location.reload()
      },
      (error) => {
        console.log('Error Occured', error);
        this.notification.error('Error Deleting Resource!');
      }
    );
  }
}

