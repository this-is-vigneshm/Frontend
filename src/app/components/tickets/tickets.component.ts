import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import {  TicketResp } from 'src/app/models/TicketResp';
import { UpdateStatusReq } from 'src/app/models/UpdateStatusReq';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<TicketResp> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<TicketResp> | null;
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
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{

  tickets: TicketResp[] =[];

  userData: any ;

  searchResults:any=[]

  categories = [
    {text :"Low Priority (Green)", value :"Green"},
    {text :"High Priority (Yellow)", value :"Yellow"},
    {text :"Very High Priority (Orange)", value :"Orange"},
    {text :"Critical Issue (Red)", value :"Red"}
   ]

  constructor(private fb: UntypedFormBuilder, private restApiService : RestapiService, private notification: NzMessageService,
    private tokenService : TokenService,  private router: Router){
  }

  ngOnInit(): void {
      var currentRoute = this.router.url;
      this.userData = this.tokenService.getCurrentUserData();
      const userId = this.userData.userId
      if(currentRoute == "/tickets"){
        this.getAllTickets();
      }else if(currentRoute == "/tickets/self" ) {
        this.getMyTickets(userId);
      }else if(currentRoute=="/tickets/open"){
        this.getAllOpenTickets()
      }
    
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: TicketResp, b: TicketResp) =>  a.uuid.localeCompare(b.uuid) ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Title',
      sortOrder: 'descend',
      sortFn: (a: TicketResp, b: TicketResp) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Description',
      sortOrder: 'descend',
      sortFn: (a: TicketResp, b: TicketResp) => a.description.localeCompare(b.description),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn:null,
      filterMultiple: true
    },
    {
      name: 'Category',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: TicketResp, b: TicketResp) => a.category.localeCompare(b.category),
      filterMultiple: false,
      listOfFilter: this.categories,
      filterFn: (list: string[], item: TicketResp) => list.includes(item.category)
    },
    {
      name: 'Status',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: TicketResp, b: TicketResp) => a.status.localeCompare(b.status),
      filterMultiple: false,
      listOfFilter:[
        { text: 'Open', value: 'Open' , byDefault: false },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Resolved', value: 'Resolved'},
        { text: 'Closed', value: 'Closed'}
      ],
      filterFn: (list: string[], item: TicketResp) => list.includes(item.status)
    },
    {
      name: 'Assigned To',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: TicketResp, b: TicketResp) => a.employeeName.localeCompare(b.employeeName),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Expected Completion Time',
      sortOrder: null,
      sortFn: (a: TicketResp, b: TicketResp) => a.expectedCompletionTime - b.expectedCompletionTime ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    }
  ];

  innerColumns = [
    {
      name: 'Created Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: TicketResp, b: TicketResp) => a.createdTime - b.createdTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Created By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: TicketResp, b: TicketResp) => a.createdBy.localeCompare(b.createdBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: TicketResp, b: TicketResp) => a.updatedTime - b.updatedTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: TicketResp, b: TicketResp) => a.updatedBy.localeCompare(b.updatedBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Time Taken',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn:  (a: TicketResp, b: TicketResp) => a.timeTaken - b.timeTaken,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    }
  ]

  getAllTickets(){
    this.restApiService.getAllTickets().subscribe(
      data =>{
        this.tickets = data.responseData;
        this.notification.success("Ticket List Updated")
        console.log("All",data)
        console.log(this.tickets);
        this.searchResults = this.tickets
      } ,
      error=>{
        console.log("Error Occured", error);
        this.notification.error("Ticket Fetching Failed")
      }
      )
  }

  filterData(event : any){
    function ispositive(element:TicketResp, index:any, array:any)
    { 
      return ( element.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
       || element.employeeName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.employeeMail.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) 
      || element.category.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
      || element.status.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) 
      || element.employeeDepartment.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
      || element.uuid.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
       || element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    } 
    this.searchResults = this.tickets.filter(ispositive);
  }

  getMyTickets(empId: number){
    this.restApiService.getAllTicketsEmployeeId(empId).subscribe(
      data =>{
        this.tickets = data.responseData;
        this.notification.success("Ticket List Updated")
        console.log("Tickets Obtained",data)
        this.searchResults = this.tickets
      } ,
      error=>{
        console.log("Error Occured", error);
        this.notification.error("Ticket Fetching Failed")
      }
      )
  }

  getAllOpenTickets(){
    this.restApiService.getAllTicketsByStatus("OPEN").subscribe(
      data =>{
        this.tickets = data.responseData;
        this.notification.success("Ticket List Updated")
        console.log("Open", data)
        this.searchResults = this.tickets
      } ,
      error=>{
        console.log("Error Occured", error);
        this.notification.error("Ticket Fetching Failed")
      }
      )
  }

  getDayDifference(diff:number){
    let diffInDate = diff/  86400000;
    Math.round(diffInDate);
  }

  updateTicketStatus(ticketId:string, updatedStatus : string){
      // var updateStatusRequest = new UpdateStatusReq(ticketId, updatedStatus, 0, this.userData.userId);
      // this.restApiService.updateTicketStatus(updateStatusRequest).subscribe(
      //   data => {
      //     console.log("Ticket Updated", data);
      //     this.notification.success("Ticket Updated Successfully!")
      //   },
      //   error=>{
      //     console.log("Error Occured!", error);
      //     this.notification.error("Ticket Status Updation Failed!")
      //   }
      // )
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

  handleCreateTicketOk(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCreateTicketCancel(): void {
    this.isVisibleMiddle = false;
  }

  selectedTicket : any;

  isUpdateStatusVisible = false;

  showUpdateStatusModal(ticketData:any): void {
    this.isUpdateStatusVisible = true;
    this.selectedTicket = ticketData;
  }

  handleUpdateStatusOk(): void {
    console.log('click ok');
    this.isUpdateStatusVisible = false;
    this.selectedTicket = null;
  }

  handleUpdateStatusCancel(): void {
    this.isUpdateStatusVisible = false;
    this.selectedTicket = null;
  }
}
