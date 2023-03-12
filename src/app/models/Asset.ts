import { Area } from "./Area";
import { Facility } from "./Facility";
import { Room } from "./Room";

export class Asset{
     id:number;
     name:string;
     code: string;
     description:string;
     location:Facility;
     area: number;
     room: number;
     serialNo: number;
     category:string;
     department: string;
     subAsset: string;
     system: string;
     supplier: string;
     status: string;
     priority: string;
     make: string;
     model: string;
     price:number;
     createdBy:string;
     createdTime: number;
     updatedBy: string;
     updatedTime: number;
     expand : boolean;
     userId : number;
    
    constructor(     id:number,
        name:string,
        code: string,
        description:string,
        location:Facility,
        area:number,
        room:number,
        serialNo: number,
        category:string,
        department: string,
        subAsset: string,
        system: string,
        supplier: string,
        status: string,
        priority: string,
        make: string,
        model: string,
        price:number,
        createdBy:string,
        createdTime: number,
        updatedBy: string,
        updatedTime: number,
        userId : number){
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.location = location;
        this.area = area;
        this.room = room;
        this.serialNo = serialNo;
        this.category = category;
        this.department = department;
        this.subAsset = subAsset;
        this.system = system;
        this.supplier = supplier;
        this.status = status;
        this.priority = priority;
        this.make = make;
        this.model = model;
        this.price = price;
        this.createdBy = createdBy
        this.createdTime = createdTime
        this.updatedBy = updatedBy
        this.updatedTime = updatedTime
        this.expand = false
        this.userId = userId
    }
}