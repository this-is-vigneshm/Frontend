import { Facility } from "./Facility";

export class Asset{
     id:number;
     name:string;
     code: string;
     serialNo: number;
     description:string;
     location:Facility;
     category:string;
     department: string;
     supplier: string;
     subAsset: string;
     system: string;
     priority: string;
     model: string;
     make: string;
     price:number;
     createdBy:string;
     createdTime: number;
     updatedBy: string;
     updatedTime: number;
     expand : boolean;
     userId : number;
    
    constructor(id: number, name: string, code: string, serialNo: number, description: string, location: Facility, category: string, department:string, supplier:string, subAsset:string, system: string, priority:string, model:string,make: string, price: number, 
         createdBy:string, createdTime: number, updatedBy: string,
        updatedTime: number,userId:number){
        this.id = id;
        this.name = name;
        this.code = code;
        this.serialNo = serialNo;
        this.description = description;
        this.location = location;
        this.category = category;
        this.department = department;
        this.supplier = supplier;
        this.subAsset = subAsset;
        this.system = system;
        this.priority = priority;
        this.model = model;
        this.make = make;
        this.price = price;
        this.createdBy = createdBy
        this.createdTime = createdTime
        this.updatedBy = updatedBy
        this.updatedTime = updatedTime
        this.expand = false
        this.userId = userId
    }
}