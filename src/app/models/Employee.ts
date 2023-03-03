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
     password: string;
     
    
    constructor(id: number, name: string, email: string,username: string,phoneNumber: number,department: string, designation: string,roles : Set<string>,address: string, location: string,usertype: string,resourceplanner: string,password: string){
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
        this.password = password;
    }

}