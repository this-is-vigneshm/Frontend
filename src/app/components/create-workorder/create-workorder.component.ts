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
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';



interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}
interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Resource> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Resource> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
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
  workorderData!: WorkOrder | null;

  size: 'large' | 'small' | 'default' = 'default';

  @Input()
  ticketid = ""

  @Output()
  close: EventEmitter<Map<string, any>> = new EventEmitter<Map<string, any>>();



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

    if (this.workorderData == null) {
      this.validateForm = this.fb.group({
        status: ["In Progress"],
        // name: [null],
        // emailId: [null],
        // phoneNumber: [null,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
        workOrderCode :  [null, [Validators.required,]],
        description: [null, [Validators.required, Validators.maxLength(200)]],
        workSubject: [null, [Validators.required,]],
        taskDetails: [null, [Validators.required,]],
        workOrderCost: [null, [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
        date: [null, [Validators.required]],
      });
      console.log(this.ticketid)
    }

  }

  id: any
  createItemByData(workorder: WorkOrder, file: File) {
    workorder.ticketId = this.ticketid
    workorder.employeeId = this.userData.userId
    workorder.status = "Active"
    workorder.emailId = this.emailId
    workorder.phoneNumber = this.phNo
    workorder.name = this.name
    console.log('submit', this.validateForm.value);
    this.restService.registerWo(workorder, file).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Workorder Created Successfully.")
        //  this.router.navigateByUrl("/");
        this.isVisibleMiddle = true;
        this.id = data.responseData
      },
      error => {
        console.log("Error occcured", error)
      }
    );
  }
  isb = false
  resources: Resource[] = [];
  searchResults: any
  getAllResource(id:any) {
    this.restService.getAllResourceByWorkOrderCode(id).subscribe(
      data => {
        console.log("Data Obtained", data);
        this.notification.success("Resources List Obtained!");
        this.resources = data.responseData;
        this.searchResults = this.resources;
        this.condition = true
      },
      error => {
        console.log("Error Occurred", error);
        this.notification.error("Resources Fetching Failed!");
      }
    );
  }


  handleUpdateResource(data: any) {
    this.selectedResource = data;
    this.isVisibleMiddle = true;
  }
  handleCreateResourceSave(id : any): void {
    this.selectedResource = null;
    this.isVisibleMiddle = false;
    console.log(id)
    this.getAllResource(id)
  }

  handleCreateResourceCancel(): void {
    this.selectedResource = null;
    this.isVisibleMiddle = false;
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


  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
  }
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

  listOfColumns: ColumnItem[] = [
    {
      name: 'User Id',
      sortOrder: null,
      sortFn: (a: Resource, b: Resource) => a.userId - b.userId,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Resource Id',
      sortOrder: 'descend',
      sortFn: (a: Resource, b: Resource) => a.resourceId - b.resourceId,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Resource Name',
      sortOrder: 'descend',
      sortFn: (a: Resource, b: Resource) => a.resourceName.localeCompare(b.resourceName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    }
  ];


  listOfColumns1: ColumnItem[] = [
    {
      name: 'Inventory Id',
      sortOrder: null,
      sortFn: (a: Resource, b: Resource) => a.inventoryId - b.inventoryId,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Resource Name',
      sortOrder: 'descend',
      sortFn: (a: Resource, b: Resource) => a.resourceName.localeCompare(b.resourceName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Availability',
      sortOrder: 'descend',
      sortFn: (a: Resource, b: Resource) => a.availability.localeCompare(b.availability),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    }

  ];

  changeA() {
    this.isa = true
    this.isb = false
  }
  changeB() {
    this.isa = false
    this.isb = true
  }

  isClick = false
  getCaptcha(event: MouseEvent) {
    console.log(event)
    this.isClick = !this.isClick
    event.preventDefault()
  }
  map : Map<string, any> = new Map<string, any>()
  getHello(event:MouseEvent){
    event.preventDefault()
    this.close.emit(this.map.set(this.ticketid, this.id.orderNo));
  }
  
}

