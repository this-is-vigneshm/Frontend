import { Facility } from "./Facility";

export class Asset{
     id:number;
     name:string;
     description:string;
     price:number;
     location:Facility;
     createdBy:string;
     createdTime: number;
     updatedBy: string;
     updatedTime: number;
     expand : boolean;
     userId : number;
    
    constructor(id: number, name: string, description: string, price: number, 
        location: Facility, createdBy:string, createdTime: number, updatedBy: string,
        updatedTime: number,userId:number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.location = location;
        this.createdBy = createdBy
        this.createdTime = createdTime
        this.updatedBy = updatedBy
        this.updatedTime = updatedTime
        this.expand = false
        this.userId = userId
    }
}