import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Inventory } from 'src/app/models/Inventory';
import { RestapiService } from 'src/app/restapi.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Inventory> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Inventory> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent {
  constructor(private restService:RestapiService, private router: Router, 
    private notification: NzMessageService){
  }
  
  selectedInventory! : Inventory | null ;
  options : string = ''
  searchString : any ;

  size: NzButtonSize='small'

  ngOnInit(): void {
    if(localStorage.getItem("access_token") === null){
      this.router.navigateByUrl("/signin");
      window.location.pathname="/signin"
    }else{
      this.getItem()
    }
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Inventory, b: Inventory) => a.id - b.id ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: 'descend',
      sortFn: (a: Inventory, b: Inventory) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Item Code',
      sortOrder: null,
      sortFn: (a: Inventory, b: Inventory) => a.code - b.code ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Description',
      sortOrder: 'descend',
      sortFn: (a: Inventory, b: Inventory) => a.description.localeCompare(b.description),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: (description: string, item: Inventory) => item.description.indexOf(description) !== -1,
      filterMultiple: true
    },
    {
      name: 'Quantity',
      sortOrder: null,
      sortFn: (a: Inventory, b: Inventory) => a.quantity - b.quantity ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Price',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Inventory, b: Inventory) => a.price - b.price,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
  ];


  innerColumns = [ {
      name: 'Created Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Inventory, b: Inventory) => a.createdTime - b.createdTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Created By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Inventory, b: Inventory) => a.createdBy.localeCompare(b.createdBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Inventory, b: Inventory) => a.updatedTime - b.updatedTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Inventory, b: Inventory) => a.updatedBy.localeCompare(b.updatedBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    }
  ]

  inventoryList:Inventory[] =[];

  searchResults :any;

  // filterItems(event : any){
  //   function ispositive(element:any, index:any, array:any)
  //   { 
  //     // return (element.name.includes(event.target.value))
  //     return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.createdBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) )
  //   } 
  //   this.searchResults = this.inventoryList.filter(ispositive);
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
    function ispositive1(element:any, index:any, array:any)
    { 
      return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
     element.createdBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) )
    } 
    
    this.searchResults = this.inventoryList.filter(ispositive1);
    break

    case 'name':
      function ispositive2(element: any, index: any, array: any) {
        return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) )
        
      }
     
      this.searchResults= this.inventoryList.filter(ispositive2);
    break

    case 'code':
      function ispositive3(element: any, index: any, array: any) {
        return (element.code.toFixed().includes(event.target.value.toLocaleLowerCase()))
        
      }
      
      this.searchResults= this.inventoryList.filter(ispositive3);
    break
  
    case 'quantity':
      function ispositive4(element:any, index: any, array: any) {
        return (element.quantity.toFixed().includes(event.target.value.toLocaleLowerCase()))
        
      }
    
      this.searchResults= this.inventoryList.filter(ispositive4);
    break
    case 'price':
      function ispositive5(element:any, index: any, array: any) {
        return (element.price.toFixed().includes(event.target.value.toLocaleLowerCase()))
        
      }
    
      this.searchResults= this.inventoryList.filter(ispositive5);
    break
}
}

  getItem(){
    this.restService.getItem().subscribe(
      data=>{
        this.inventoryList = data.responseData;
        this.searchResults = this.inventoryList
        console.log(this.inventoryList)
        this.notification.success("Inventory List is available!")
      },
      error=>{
        console.log("Error Occured",error); 
        this.notification.error("Error Fetching Inventory List!")
      }

    )
  }

  deleteItemById(itemId: any){
    this.restService.deleteItem(itemId).subscribe(
      data =>{
        this.notification.success("Inventory Deleted Successfully.!")
        window.location.reload();
      },
      error=>{
        console.log("Error Occured", error);
        this.notification.error("Error Deleting Item!")
      }
    )
  }

  handleDelete(itemId : any){
    this.deleteItemById(itemId);
  }

  //Create / Update Asset Model

  isVisibleMiddle = false;

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleUpdateItem(data : any){
    this.selectedInventory = data;
    this.isVisibleMiddle = true;
  }
  handleCreateItemOk(): void {
    this.selectedInventory = null;
    this.isVisibleMiddle = false;
  }

  handleCreateItemCancel(): void {
    this.selectedInventory = null;
    this.isVisibleMiddle = false;
  }


  //Create Ticket Modal Props
  
  isCreatTicketVisible = false;


  handleCreateTicketOk(): void {
    this.selectedInventory = null;
    this.isCreatTicketVisible = false;
  }

  handleCreateTicketCancel(): void {
    this.selectedInventory = null;
    this.isCreatTicketVisible = false;
  }

}
