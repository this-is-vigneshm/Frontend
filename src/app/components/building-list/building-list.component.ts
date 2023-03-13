import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Building } from 'src/app/models/Building';
import { RestapiService } from 'src/app/restapi.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Building> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Building> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent {




  @Input()
  locationId : any


  building: Building[] =[];


  panels = [
    {
      active: true,
      disabled: false,
      name: 'Building',
      icon: 'tool',
      customStyle: {
        background: '#ffffff',
        'border-radius': '10px',
        'margin-bottom': '5px',
        border: '0px'
      }
    }
  ];


  searchResults:any=[]

  ngOnInit(): void {
    this.getAllBuildingByLocation(this.locationId);
  }

  constructor(private notification: NzMessageService, private restService: RestapiService){
  }
  buildingColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Building, b: Building) => a.id - b.id ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Building, b: Building) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Location Id',
      sortOrder: null,
      sortFn: (a: Building, b: Building) => a.locationId - b.locationId ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
  ];




  getAllBuilding(){
    this.restService.getAllBuilding().subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("Building List Obtained!");
        this.building =data.responseData ;
        this.searchResults = this.building
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("Building Fetching Failed!");
      }
    );
  }
  getAllBuildingByLocation(id:number){
    this.restService.getAllBuildingByLocation(id).subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("Building List Obtained!");
        this.building =data.responseData ;
        this.searchResults = this.building
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("Building Fetching Failed!");
      }
    );
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
  item ! : Building | null
  loc1:boolean = true
  loc:boolean = false
  forLocation(event:MouseEvent, data:any){
    event.preventDefault()
    this.loc = !this.loc
    this.loc1 = !this.loc1
    this.item = data;
  }
}
