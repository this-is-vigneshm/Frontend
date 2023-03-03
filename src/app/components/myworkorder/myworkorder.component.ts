import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { UpdateStatusReq } from 'src/app/models/UpdateStatusReq';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { WorkOrderResp } from 'src/app/models/WorkOrderResp';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<WorkOrderResp> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<WorkOrderResp> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-myworkorder',
  templateUrl: './myworkorder.component.html',
  styleUrls: ['./myworkorder.component.css']
})
export class MyworkorderComponent implements OnInit{

  Myworkorder: WorkOrderResp[] =[];

  userData: any ;


  searchResults:any=[]

  constructor(private fb: UntypedFormBuilder, private restApiService : RestapiService, private notification: NzMessageService,
    private tokenService : TokenService,  private router: Router){
  }

  ngOnInit(): void {
    if (this.tokenService.getToken() === null) {
      this.router.navigateByUrl("/signin");
      window.location.pathname = "/signin"
      
    } 
    else {
      this.userData = this.tokenService.getCurrentUserData();
       if(!this.userData.roles.includes("ADMIN")){
        this.notification.warning("You are not authorizaed to visit this page!")
        this.router.navigateByUrl("/home")
       }else{
        this.getAllWorkOrders();
       }
     
    }
}
listOfColumns: ColumnItem[] = [
  {
    name: 'Order No',
    sortOrder: null,
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) =>  a.orderNo-b.orderNo,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null
  },
  {
    name: 'WorkOrder Status',
    sortOrder: 'descend',
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.status.localeCompare(b.status),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null
  },
  {
    name: 'Created By',
    sortOrder: 'descend',
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', null],
    listOfFilter: [],
    filterFn:null,
    filterMultiple: true
  },
  {
    name: 'Creater Email Id',
    sortOrder: 'descend',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.emailId.localeCompare(b.emailId),
    filterMultiple: false,
    listOfFilter: [],
    filterFn:null,
  },
  {
    name: 'Creater Tele No',
    sortOrder: 'ascend',
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.phoneNumber-b.phoneNumber,
    filterMultiple: true,
    listOfFilter:[],
    filterFn: null
  },
 
];

innerColumns = [
  {
    name: 'Description',
    sortOrder: null,
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.description .localeCompare(b.description) ,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null
  },
  {
    name: 'Work Subject',
    sortOrder: null,
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.workSubject .localeCompare(b.workSubject) ,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null
  },
  
  {
    name: 'Task Details',
    sortOrder: null,
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.taskDetails .localeCompare(b.taskDetails) ,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null
  },
 
  {
    name: 'Work Order Cost',
    sortOrder: null,
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.workOrderCost -b.workOrderCost ,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null
  },
  {
    name: 'Date',
    sortOrder: null,
    sortFn: (a: WorkOrderResp, b: WorkOrderResp) => a.date -b.date ,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null
  },
] 
workorderList : WorkOrderResp[] = [];

getAllWorkOrders() {
  this.restApiService.getAllWorkOrders().subscribe(
    data => {
      console.log("Success", data)
      this.workorderList = data.responseData;
      this.searchResults = this.workorderList;
      this.notification.success("workorder Details is Found!")
    },
    error => {
      console.log("Error occurred", error);
      this.notification.error("Error getting the Workorder Details!")
    }
  );
}





filterData(event : any){
  function ispositive(element:WorkOrderResp, index:any, array:any)
  { 
    return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
     || element.emailId.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) 
    || element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    || element.taskDetails.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    || element.createdBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
     || element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
  } 
  // this.searchResults = this.WorkOrder.filter(ispositive);
}

editId : string | null =null;
  
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }



  isVisibleMiddle = false;

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleCreateWorkOrderOk(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCreateWorkOrderCancel(): void {
    this.isVisibleMiddle = false;
  }
  handleDeleteWo(orderNo: any){
    this.restApiService.deleteWo(orderNo).subscribe(
      data=>{
        console.log("Success", data);
        this.notification.success("Workorder Deleted Successfully!")
      },
      error=>{
        console.log("Error Occured", error)
        this.notification.error("Could not delete Workorder!")
      }
    )
}

  selectedWorkOrder : any;

  isUpdateStatusVisible = false;

  showUpdateStatusModal(WorkOrderData:any): void {
    this.isUpdateStatusVisible = true;
    this.selectedWorkOrder = WorkOrderData;
  }

  handleUpdateStatusOk(): void {
    console.log('click ok');
    this.isUpdateStatusVisible = false;
    this.selectedWorkOrder = null;
  }

  handleUpdateStatusCancel(): void {
    this.isUpdateStatusVisible = false;
    this.selectedWorkOrder = null;
  }
}
