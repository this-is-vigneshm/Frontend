import { Component } from '@angular/core';
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








floor: Floor[] =[];



  searchResults:any=[]

  ngOnInit(): void {
    this.getAllFloor();
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
        this.notification.success("Building List Obtained!");
        this.floor =data.responseData ;
        this.searchResults = this.floor
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
  loc1:boolean = true
  loc:boolean = false
  forLocation(event:MouseEvent){
    event.preventDefault()
    this.loc = !this.loc
    this.loc1 = !this.loc1
  }
}
