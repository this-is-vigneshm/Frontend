import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Employee } from 'src/app/models/Employee';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Employee> | null;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  userData:any;
  
  constructor(private restApiService: RestapiService, private notification: NzMessageService, private router: Router, private tokenService: TokenService) {

  }
  ngOnInit(): void {
    if (this.tokenService.getToken() === null) {
      this.router.navigateByUrl("/signin");
      window.location.pathname = "/signin"
      
    } 
    else {
      this.userData = this.tokenService.getCurrentUserData();
       if(!this.userData.roles.includes("ADMIN")){
        this.notification.warning("You are not authorizaed to visit this page!")
        this.router.navigateByUrl("/home")
       }else{
        this.getEmployeeDetails();
       }
     
    }

  }

  employeeColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Employee, b: Employee) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null]
    },
    {
      name: 'Name',
      sortOrder: 'descend',
      sortFn: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null]
    },
    {
      name: 'Email',
      sortOrder: 'descend',
      sortFn: (a: Employee, b: Employee) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Phone Number',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.phoneNumber - b.phoneNumber,
    },
    {
      name: 'Department',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.department.localeCompare(b.department),
    },
    {
      name: 'Designation',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.designation.localeCompare(b.designation),
    },
    {
      name: 'Roles',
      sortOrder: null,
      sortDirections: [],
      sortFn: null
    }
  ];


  employeeList: any = [];
  searchString: any;
  searchResults: any = []

  getEmployeeDetails() {
    this.restApiService.getEmployees().subscribe(
      data => {
        console.log("Success", data)
        this.employeeList = data.responseData;
        this.searchResults = this.employeeList;
        this.notification.success("Employee Details is Found!")
      },
      error => {
        console.log("Error occurred", error);
        this.notification.error("Error getting the employee Details!")
      }
    );
  }

  filterData(event: any) {
    function ispositive(element: Employee, index: any, array: any) {
      return (element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
        element.email.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
        element.username.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
        element.department.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
        element.designation.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    }
    this.searchResults = this.employeeList.filter(ispositive);
  }

  isCreateEmployeeModalVisible: boolean = false;

  showCreateEmployeeModal() {
    this.isCreateEmployeeModalVisible = true;
  }
  handleCreateEmployeeCancel() {
    this.isCreateEmployeeModalVisible = false;
  }

  handleCreateEmployeeOk() {
    this.isCreateEmployeeModalVisible = false;
  }
}
