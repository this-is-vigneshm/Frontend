import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Floor } from 'src/app/models/Floor';
import { RestapiService } from 'src/app/restapi.service';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Floor> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Floor> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent {




@Input()
buildingId : any



floor: Floor[] =[];

panels = [
  {
    active: true,
    disabled: false,
    name: 'Floor',
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
    this.getAllFloorByBuilding(this.buildingId);
  }

  constructor(private notification: NzMessageService, private restService: RestapiService){
  }
 floorColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Floor, b: Floor) => a.id - b.id ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Floor, b: Floor) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    }
  ];




  getAllFloor(){
    this.restService.getAllFloor().subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("floor List Obtained!");
        this.floor =data.responseData ;
        this.searchResults = this.floor
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("floor Fetching Failed!");
      }
    );
  }
  getAllFloorByBuilding(id:number){
    this.restService.getAllFloorByBuilding(id).subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("floor List Obtained!");
        this.floor =data.responseData ;
        this.searchResults = this.floor
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("floor Fetching Failed!");
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
  item!:Floor|null
  loc1:boolean = true
  loc:boolean = false
  loc2:boolean = false
  forLocation(event:MouseEvent, data:any){
    event.preventDefault()
    this.loc = !this.loc
    this.loc1 = !this.loc1
    this.item = data;
  }
  forLoc(event:MouseEvent, data:any){
    event.preventDefault()
    this.loc2 = !this.loc2
    this.loc1 = !this.loc1
    this.item = data;
  }
}
