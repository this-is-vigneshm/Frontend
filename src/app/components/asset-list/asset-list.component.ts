import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Asset } from 'src/app/models/Asset';
import { RestapiService } from 'src/app/restapi.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Asset> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Asset> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit{
  options : string = ''
  constructor(private restService:RestapiService, private router: Router, 
    private notification: NzMessageService,  private restApiService: RestapiService){
  }
  
  selectedAsset! : Asset | null ;

  size: NzButtonSize='small'

  searchString : any ;

  nav = "create"

  nav1 = "preview"

  ngOnInit(): void {
    if(localStorage.getItem("access_token") === null){
      this.router.navigateByUrl("/signin");
      window.location.pathname="/signin"
    }else{
      this.getAssets()
    }
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Asset, b: Asset) => a.id - b.id ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: 'descend',
      sortFn: (a: Asset, b: Asset) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Description',
      sortOrder: 'descend',
      sortFn: (a: Asset, b: Asset) => a.description.localeCompare(b.description),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: (description: string, item: Asset) => item.description.indexOf(description) !== -1,
      filterMultiple: true
    },
    {
      name: 'Price',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Asset, b: Asset) => a.price - b.price,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Facility Name',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Asset, b: Asset) => a.location.facilityName.localeCompare(b.location.facilityName),
      filterMultiple: false,
      listOfFilter:[
        { text: 'Coimbatore', value: 'Coimbatore' },
        { text: 'Pune', value: 'Pune' },
        { text: 'Chennai', value: 'Chennai', byDefault: false }
      ],
      filterFn: (list: string[], item: Asset) => list.includes(item.location.facilityName)
    },
    {
      name: 'Facility Code',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Asset, b: Asset) => a.location.facilityCode.localeCompare(b.location.facilityCode),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
  ];


  innerColumns = [
    {
      name: 'Created Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Asset, b: Asset) => a.createdTime - b.createdTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Created By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Asset, b: Asset) => a.createdBy.localeCompare(b.createdBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Asset, b: Asset) => a.updatedTime - b.updatedTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Asset, b: Asset) => a.updatedBy.localeCompare(b.updatedBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    }
  ]

  assetList:Asset[] =[];

  searchResults :any;

  // filterAssets(event : any){
  //   function ispositive(element:any, index:any, array:any)
  //   { 
  //     // return (element.name.includes(event.target.value))
  //     return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.location.facilityName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.location.facilityCode.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.createdBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) )
  //   } 
  //   this.searchResults = this.assetList.filter(ispositive);
  // }
  
   selectChange(a:any)
  {
    this.options = a
    console.log(this.options)
  }
  
  filterdata1(options:any, event: any) {
    console.log(options)
    switch(options)
    {
      case 'all':
        function ispositive1(element: any, index: any, array: any) {
      return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.location.facilityName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.location.facilityCode.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.createdBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.updatedBy.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) )
        }
        this.searchResults= this.assetList.filter(ispositive1);
        break
  
      case 'name':
        function ispositive2(element: any, index: any, array: any) {
          return (element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.assetList.filter(ispositive2);
        break
      case 'facilityName':
        function ispositive3(element: any, index: any, array: any) {
          return (element.location.facilityName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.assetList.filter(ispositive3);
      break
      case 'facilityCode':
        function ispositive4(element: any, index: any, array: any) {
          return (element.location.facilityCode.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.assetList.filter(ispositive4);
      break
  }
  }
  getAssets(){
    this.restService.getAssets().subscribe(
      data=>{
        this.assetList = data.responseData;
        this.searchResults = this.assetList
        console.log(this.assetList)
        this.notification.success("Asset List is available!")
      },
      error=>{
        console.log("Error Occured",error); 
        this.notification.error("Error Fetching Asset List!")
      }

    )
  }

  deleteAssetById(assetId: any){
    this.restService.deleteAsset(assetId).subscribe(
      data =>{
        this.notification.success("Asset Deleted Successfully.!")
      },
      error=>{
        console.log("Error Occured", error);
        this.notification.error("Error Deleting Asset!")
      }
    )
  }

  handleDelete(assetId : any){
    this.deleteAssetById(assetId);
  }

  //Create / Update Asset Model

  isVisibleMiddle = false;

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleUpdateAsset(data : any){
    this.selectedAsset = data;
    this.isVisibleMiddle = true
    this.nav = "update"
  }
  handleCreateAssetOk(): void {
    this.selectedAsset = null;
    this.isVisibleMiddle = false;
  }

  handleCreateAssetCancel(): void {
    this.selectedAsset = null;
    this.isVisibleMiddle = false;
    this.nav = "create"
  }


  //Create Ticket Modal Props
  
  isCreatTicketVisible = false;

  showCreateAssetModal(data:any): void {
    this.selectedAsset = data;
    this.isCreatTicketVisible = true;
  }

  handleCreateTicketOk(): void {
    this.selectedAsset = null;
    this.isCreatTicketVisible = false;
  }

  handleCreateTicketCancel(): void {
    this.selectedAsset = null;
    this.isCreatTicketVisible = false;
  }

  viewId: any;
  visible = false;
  viewPage(id: any) {
    this.viewId = id;
    this.visible = true;
  }  close() {
    this.visible = false;
  }

  rooms:any
  areas:any
  getAllRoomAndArea(id:any){
    console.log(id)
    
    this.restService.getAllAreaByFloor(id).subscribe(
      data=>{
          console.log('Area Fetched Successfully', data)
          this.areas = data.responseData;
      },
      error=>{
        console.log('Area Fetching Failed',error)
      }
    )
    this.restService.getAllRoomByFloor(id).subscribe(
      data=>{
          console.log('Room Fetched Successfully', data)
          this.rooms = data.responseData;
      },
      error=>{
        console.log('Room Fetching Failed',error)
      }
    )
  }
 
}
