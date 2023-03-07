export class Employee{
    
    id:number;
    name:string;
    email:string;
    username: string
    phoneNumber:number;
    department: string;
    designation: string;
    roles:Set<string>;
    address:string;
    location:string;
    usertype:string;
    resourceplanner:string;
    status:string;
    expand : boolean;
    password: string;
    
   
   constructor(id: number, name: string, email: string,username: string,phoneNumber: number,department: string, designation: string,roles : Set<string>,address: string, location: string,usertype: string,resourceplanner: string,status:string,password: string){
       this.id = id;
       this.name = name;
       this.email = email;
       this.username = username;
       this.phoneNumber = phoneNumber;
       this.department = department;
       this.designation = designation;
       this.roles = roles;
       this.address = address;
       this.location = location;
       this.usertype = usertype;
       this.resourceplanner = resourceplanner;
       this.status=status;
       this.password = password;
       this.expand = false
   }

}