import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTableSortOrder,
  NzTableSortFn,
  NzTableFilterList,
  NzTableFilterFn,
} from 'ng-zorro-antd/table';
import { Resource } from 'src/app/models/Resource';

import { RestapiService } from 'src/app/restapi.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Resource> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Resource> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-resourcelist',
  templateUrl: './resourcelist.component.html',
  styleUrls: ['./resourcelist.component.css'],
})
export class ResourcelistComponent {


  


  constructor(
    private restService: RestapiService,
    private router: Router,
    private notification: NzMessageService,
    private restApiService: RestapiService
  ) {}

  selectedResource!: Resource | null;
  searchString: any;
  userData: any;
  @Input()
  workorderCode : any

  @Output()
  innertable : EventEmitter<void> = new EventEmitter<void>()


  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigateByUrl('/signin');
      window.location.pathname = '/signin';
    } else {
      this.getResource(this.workorderCode);
    }
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'workerOrderId',
      sortOrder: null,
      sortFn: null,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'resourceCode',
      sortOrder: null,
      sortFn: (a: Resource, b: Resource) => a.resourceId - b.resourceId,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'resourceName',
      sortOrder: 'descend',
      sortFn: (a: Resource, b: Resource) =>
        a.resourceName.localeCompare(b.resourceName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'availability',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Resource, b: Resource) => a.availability - b.availability,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'startDate',
      sortOrder: null,
      sortFn: (a: Resource, b: Resource) => a.startDate - b.startDate,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'endDate',
      sortOrder: null,
      sortFn: (a: Resource, b: Resource) => a.endDate - b.endDate,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'userId',
      sortOrder: null,
      sortFn: (a: Resource, b: Resource) => a.userId - b.userId,
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
    },
  ];
  resourceList: Resource[] = [];

  searchResults: Resource[] = [];

  filterResource(event: any) {
    function ispositive(element: any, index: any, array: any) {
      // return (element.name.includes(event.target.value))
      return (
        element.name
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase()) ||
        element.description
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase()) ||
        element.location.facilityName
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase()) ||
        element.location.facilityCode
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase()) ||
        element.createdBy
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase()) ||
        element.updatedBy
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      );
    }
    this.searchResults = this.resourceList.filter(ispositive);
  }

  getResource(id:any) {
    this.restService.getAllResourceByWorkOrderCode(id).subscribe(
      (data) => {
        this.resourceList = data.responseData;
       for(var i of this.resourceList)
       {
        if(i.resourceType == "User")
        {
          this.searchResults.push(i)
        }
       }
        console.log(this.resourceList);
        this.notification.success('Resource List is available!');
        this.innertable.emit();
      },
      (error) => {
        console.log('Error Occured', error);
        this.notification.error('Error Fetching Resource List!');
      }
    );
  }

  deleteById(resourceId: any) {
    this.restService.deleteById(resourceId).subscribe(
      (data) => {
        this.notification.success('Resource Deleted Successfully.!');
        window.location.reload()
      },
      (error) => {
        console.log('Error Occured', error);
        this.notification.error('Error Deleting Resource!');
      }
    );
  }

  handleDelete(resourceId: any) {
    this.deleteById(resourceId);
  }
 
  id = null
  getId(event: any, id:any){
    console.log(event)
    if(event == true)
      {this.id = id
      console.log(id)}
  }
}
