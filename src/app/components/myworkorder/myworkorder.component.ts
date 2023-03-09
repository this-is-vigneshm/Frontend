import { Component, OnInit,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { UpdateStatusReq } from 'src/app/models/UpdateStatusReq';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { WorkOrderResp } from 'src/app/models/WorkOrderResp';
import { outputAst } from '@angular/compiler';
import { NzButtonSize } from 'ng-zorro-antd/button';

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

  @Output()
  worKOrderId : EventEmitter<number> = new EventEmitter<number>()
  options : string = ''
  Myworkorder: WorkOrderResp[] =[];

  userData: any ;

  size: NzButtonSize='small'


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



selectedWo : any;

showModal(workOrderData:any): void {
  this.isVisible = true;
  this.selectedWo = workOrderData;
}

// filterData(event : any){
//   function ispositive(element:WorkOrderResp, index:any, array:any)
//   { 
//     return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
//      || element.emailId.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) 
//     || element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
//     || element.taskDetails.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
//     || element.createdBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
//      || element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
//   } 
//   // this.searchResults = this.WorkOrder.filter(ispositive);
// }

selectChange(a:any)
  {
    this.options = a
    console.log(this.options)
  }
  
  filterData1(options:any, event: any) {
    console.log(options)
    switch(options)
    {
    case 'all':
    function ispositive1(element:WorkOrderResp, index:any, array:any)
    { 
      return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
     || element.emailId.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) 
    || element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    || element.taskDetails.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    || element.createdBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
     || element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
     ||element.orderNo.toFixed().includes(event.target.value.toLocaleLowerCase())
     ||element.status.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    ||element.workOrderCost.toFixed().includes(event.target.value.toLocaleLowerCase()))
    } 
    
    this.searchResults = this.workorderList.filter(ispositive1);
    break

    case 'orderno':
      function ispositive2(element: WorkOrderResp, index: any, array: any) {
        return ( element.orderNo.toFixed().includes(event.target.value.toLocaleLowerCase()))
        
      }
     
      this.searchResults= this.workorderList.filter(ispositive2);
    break

    case 'status':
      function ispositive3(element: WorkOrderResp, index: any, array: any) {
        return (element.status.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
        
      }
      
      this.searchResults= this.workorderList.filter(ispositive3);
    break
  
    case 'cost':
      function ispositive4(element: WorkOrderResp, index: any, array: any) {
        return (element.workOrderCost.toFixed().includes(event.target.value.toLocaleLowerCase()))
        
      }
    
      this.searchResults= this.workorderList.filter(ispositive4);
    break
}
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
        window.location.reload()
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
  isVisible = false
  // showModal(): void{
  //   this.isVisible = true
  // }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  viewId : any
  visible = false
  viewPage(id : any){
    this.viewId = id
    this.visible = true
  }

  handleCreateTicketOk()
  {
    this.visible = false
  }
  
  closeView()
  {
    this.visible = false
  }
  onCheck(event: any) {
    this.worKOrderId.emit(event)
  }
}
