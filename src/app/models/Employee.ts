export class Employee{
    
     id:number;
     name:string;
     email:string;
     phoneNumber:number;
     username: string
     password: string
     department: string
     designation: string
     roles:Set<string>;
    
    constructor(id: number, name: string, email: string, phoneNumber: number, username: string, password: string, department: string, designation: string, roles : Set<string>){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
        this.department = department
        this.designation = designation
        this.roles = roles
    }

}