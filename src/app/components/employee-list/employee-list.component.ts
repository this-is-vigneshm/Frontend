import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Employee } from 'src/app/models/Employee';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { EmployeeStatus } from 'src/app/models/EmployeeStatus';
import { NzButtonSize } from 'ng-zorro-antd/button';



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

  options : string = ''
  userData:any;
  expand = false

  size: NzButtonSize='small'

  constructor(private restApiService: RestapiService, private notification: NzMessageService, private router: Router, private tokenService: TokenService) {

  }
  ngOnInit(): void {
    if (this.tokenService.getToken() === null) {
      this.router.navigateByUrl("/signin");
      window.location.pathname = "/signin"
      
    } 
    else {
      this.userData = this.tokenService.getCurrentUserData();
      console.log(this.userData)
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
      name: 'username',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.username.localeCompare(b.username),
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
    }];

      innerColumns =[{
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
    },
    {
      name: 'Address',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.address.localeCompare(b.address),
    },
    {
      name: 'Location',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.location.localeCompare(b.location),
    },
    {
      name: 'usertype',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.usertype.localeCompare(b.usertype),
    },
    {
      name: 'Resourceplanner',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.resourceplanner.localeCompare(b.resourceplanner),
    },
    {
      name: 'status',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Employee, b: Employee) => a.resourceplanner.localeCompare(b.resourceplanner),
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


  selectChange(a:any)
  {
    this.options = a
    console.log(this.options)
  }
  
  filterData1(options:any, event: any) {
    console.log(options)
    switch(options)
    {
      case 'all':
        function ispositive1(element: Employee, index: any, array: any) {
          return (element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.email.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())|| 
          element.username.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.department.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.designation.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.address.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.location.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.usertype.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.resourceplanner.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())||
          element.phoneNumber.toFixed().includes(event.target.value.toLocaleLowerCase()||
          element.id.toFixed().includes(event.target.value.toLocaleLowerCase()))
        )
        }
        this.searchResults= this.employeeList.filter(ispositive1);
        break
  
      case 'name':
        function ispositive2(element: Employee, index: any, array: any) {
          return (element.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.employeeList.filter(ispositive2);
        break
      case 'department':
        function ispositive3(element: Employee, index: any, array: any) {
          return (element.department.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.employeeList.filter(ispositive3);
      break
      case 'Username':
        function ispositive4(element: Employee, index: any, array: any) {
          return (element.username.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.employeeList.filter(ispositive4);
      break
    
      case 'Location':
        function ispositive5(element: Employee, index: any, array: any) {
          return (element.location.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.employeeList.filter(ispositive5);
      break
      case 'Usertype':
        function ispositive6(element: Employee, index: any, array: any) {
          return (element.usertype.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
          
        }
        this.searchResults= this.employeeList.filter(ispositive6);
      break
  }
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


  Active(data:any) {
    var statusUpdate = new EmployeeStatus(data, "InActive", this.userData.userId);
    console.log(statusUpdate)
    this.restApiService.updateEmployeeStatus(data, statusUpdate ).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Employee Status updated Successfully!")
        window.location.reload()
      },
      error => {
        console.log(error)
        this.notification.error("Error updating status!")
      }
    )
   
  }

 }