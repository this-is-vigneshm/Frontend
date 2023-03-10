import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { delay } from 'rxjs';
import { Room } from 'src/app/models/Room';


import { RestapiService } from 'src/app/restapi.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Room> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Room> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {

@Input()
floorId : any



room: Room[] =[];

panels = [
  {
    active: true,
    disabled: false,
    name: 'Room',
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
    this.getAllRoomByFloor(this.floorId);
  }

  constructor(private notification: NzMessageService, private restService: RestapiService){
  }
 roomColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Room, b: Room) => a.id - b.id ,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Room, b: Room) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    }
  ];

  done(event:any){
  
    this.notification.success("Loction created Successfully")
    setTimeout(function(){
      window.location.reload()
    },3000);
    


  }
  





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
  getAllRoomByFloor(id:number){
    this.restService.getAllRoomByFloor(id).subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("room List Obtained!");
        this.room =data.responseData ;
        this.searchResults = this.room
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("room Fetching Failed!");
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
}
