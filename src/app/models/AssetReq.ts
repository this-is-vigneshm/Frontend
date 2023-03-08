export class AssetReq{
    name:string;
    code: string;
    serialNo: number;
    description:string;
    facilityCode:string;
    area: number;
    room: number;
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
    userId : number;
   
   constructor( 
       name:string,
       code: string,
       serialNo: number,
       description:string,
       facilityCode:string,
       area:number,
       room:number,
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
       userId : number){
       this.name = name;
       this.code = code;
       this.serialNo = serialNo;
       this.description = description;
       this.facilityCode = facilityCode;
       this.area = area;
       this.room = room;
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
       this.userId = userId
   }
}