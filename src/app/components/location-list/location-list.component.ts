import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Locations } from 'src/app/models/locations';
import { RestapiService } from 'src/app/restapi.service';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Locations> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Locations> | null;
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
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent {
  locations : Locations[] =[];

  isExpandable : boolean = true;

  expandedRows : any = [];

  searchResults:any=[]

  @Input()
  locId:any

  ngOnInit(): void {
    console.log(this.locId)
    this.getLocation(this.locId);
    // this.getAllLocation()
  }

  constructor(private notification: NzMessageService, private restService: RestapiService){
  }
  locationColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Locations, b: Locations) => a.id - b.id ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Locations, b: Locations) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Description',
      sortOrder: null,
      sortFn: (a: Locations, b: Locations) => a.description.localeCompare(b.description),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
   
    {
      name: 'Address ',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter:[],
      filterFn: null
    }
  ];



  getAllLocation(){
    this.restService.getAllLocations().subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("Location List Obtained!");
        this.locations =data.responseData ;
        this.searchResults = this.locations
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("Location Fetching Failed!");
      }
    );
  }
  getLocation(id:number){
    this.restService.getLocation(id).subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("Location List Obtained!");
        this.locations =data.responseData ;
        this.searchResults = this.locations
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("Location Fetching Failed!");
      }
    );
  }

  filterData(event : any){
    function ispositive(element:Locations, array:any)
    { 
      return ( element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) || 
      element.description.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.addressLine1.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) || 
      element.addressLine2.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.addressLine3.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
      element.city.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
       )
    } 
    this.searchResults = this.locations.filter(ispositive);
  }

  handleDeleteLocation(id: any){
      // this.restService.deleteFacility(id).subscribe(
      //   data=>{
      //     console.log("Success", data);
      //     this.notification.success("Location Deleted Successfully!")
      //   },
      //   error=>{
      //     console.log("Error Occured", error)
      //     this.notification.error("Could not delete Loaction!")
      //   }
      // )
  }
  selectedLocation! : Locations | null
  loc1:boolean = true
  loc:boolean = false
  forLocation(event:MouseEvent){
    event.preventDefault()
    this.loc = !this.loc
    this.loc1 = !this.loc1

  }
  forLoc(event:MouseEvent, data:any){
    event.preventDefault()
    this.loc = !this.loc
    this.loc1 = !this.loc1
    this.selectedLocation = data
  }
}
