import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Area } from 'src/app/models/Area';
import { RestapiService } from 'src/app/restapi.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Area> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Area> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent {

@Input()
floorId : any



area: Area[] =[];

panels = [
  {
    active: true,
    disabled: false,
    name: 'Area',
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
    this.getAllAreaByFloor(this.floorId);
  }

  constructor(private notification: NzMessageService, private restService: RestapiService){
  }
areaColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Area, b: Area) => a.id - b.id ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Area, b: Area) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    }
  ];




  // getAllFloor(){
  //   this.restService.getAllFloor().subscribe(
  //     data =>{
  //       console.log("Data Obtained", data);
  //       this.notification.success("floor List Obtained!");
  //       this.floor =data.responseData ;
  //       this.searchResults = this.floor
  //     },
  //     error=>{
  //       console.log("Error Occurred", error);
  //       this.notification.error("floor Fetching Failed!");
  //     }
  //   );
  // }
  getAllAreaByFloor(id:number){
    this.restService.getAllAreaByFloor(id).subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("AreaList Obtained!");
        this.area =data.responseData ;
        this.searchResults = this.area
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("Area Fetching Failed!");
      }
    );
  }
  done(event:any){
  
    this.notification.success("Loction created Successfully")
    setTimeout(function(){
      window.location.reload()
    },3000);
    


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
}

