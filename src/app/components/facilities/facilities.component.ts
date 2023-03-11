import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Facility } from 'src/app/models/Facility';
import { RestapiService } from 'src/app/restapi.service';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Facility> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Facility> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}
@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit{
  options : string = ''
  facilities : Facility[] =[];

  isExpandable : boolean = true;

  expandedRows : any = [];

  size: NzButtonSize='small'
  
  searchResults:any=[]
  
  facData!: Facility | null

  ngOnInit(): void {
    this.getAllFacilities();
  }

  constructor(private notification: NzMessageService, private restService: RestapiService){
  }
  facilityColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Facility, b: Facility) => a.facilityId - b.facilityId ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Facility, b: Facility) => a.facilityName.localeCompare(b.facilityName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Facility Code',
      sortOrder: null,
      sortFn: (a: Facility, b: Facility) => a.facilityCode.localeCompare(b.facilityCode),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Facility Type',
      sortOrder:null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Facility, b: Facility) => a.facilityType.localeCompare(b.facilityType),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Facility Source',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Facility, b: Facility) => a.facilitySource.localeCompare(b.facilitySource),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    }
  ];

  isFacVisibleMiddle:boolean=false
  handleupdate(data:any){
    this.facData=data
    this.isFacVisibleMiddle = true
  }

  innerColumns : ColumnItem[] = [
    {
      name: 'Created Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Facility, b: Facility) => a.createdTime - b.createdTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Created By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Facility, b: Facility) => a.createdBy.localeCompare(b.createdBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated Time',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Facility, b: Facility) => a.lastUpdatedTime - b.lastUpdatedTime,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    },
    {
      name: 'Updated By',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Facility, b: Facility) => a.lastUpdatedBy.localeCompare(b.lastUpdatedBy),
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    }
  ];


  getAllFacilities(){
    this.restService.getAllFacilities().subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("Facility List Obtained!");
        this.facilities =data.responseData ;
        this.searchResults = this.facilities
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("Facility Fetching Failed!");
      }
    );
  }

  // filterData(event : any){
  //   function ispositive(element:Facility, index:any, array:any)
  //   { 
  //     return ( element.facilityName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) || 
  //     element.facilityCode.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.facilityType.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
  //     element.facilitySource.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) 
  //      )
  //   } 
  //   this.searchResults = this.facilities.filter(ispositive);
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
       
    function ispositive(element:Facility, index:any, array:any)
    { 
      return ( element.facilityName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) || 
      element.facilityCode.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.facilityType.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.facilitySource.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) 
       )
    } 
    this.searchResults = this.facilities.filter(ispositive);
    break
  
      case 'name':
        function ispositive2(element: any, index: any, array: any) {
          return (element.facilityName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.facilities.filter(ispositive2);
        break
      case 'facilityType':
        function ispositive3(element: any, index: any, array: any) {
          return (element.facilityType.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.facilities.filter(ispositive3);
      break
      case 'facilityCode':
        function ispositive4(element: any, index: any, array: any) {
          return (element.facilityCode.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.facilities.filter(ispositive4);
      break
      case 'facilitySource':
        function ispositive5(element: any, index: any, array: any) {
          return (element.facilitySource.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.facilities.filter(ispositive5);
      break
  }
  }
  handleDeleteFacility(facilityId: any){
      this.restService.deleteFacility(facilityId).subscribe(
        data=>{
          console.log("Success", data);
          this.notification.success("Facility Deleted Successfully!")
          window.location.reload();
        },
        error=>{
          console.log("Error Occured", error)
          this.notification.error("Could not delete Facility!")
        }
      )
  }

  isCreateFacilityVisible = false;

  showCreateFacilityModal(): void {
    this.isCreateFacilityVisible = true;
  }

  // handleUpdateAsset(data : any){
  //   this.isCreateFacilityVisible = true;
  // }
  handleCreateFacilityOk(): void {
    this.isCreateFacilityVisible = false;
    this.isFacVisibleMiddle = false;
  }

  handleCreateFacilityCancel(): void {
    this.isCreateFacilityVisible = false;
    this.isFacVisibleMiddle = false;
  }
}
