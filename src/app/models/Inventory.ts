export class Inventory {
    id:number;
    name:string;
    code:number;
    description:string;
    quantity:number;
    price:number;
    status:string;
    createdBy:string;
    createdTime: number;
    updatedBy: string;
    updatedTime: number;
    expand : boolean;
    userId : number;
    constructor(id: number, name: string, code: number, description: string, quantity: number, price: number,status:string, 
        createdBy:string, createdTime: number, updatedBy: string,
       updatedTime: number,userId:number){
       this.id = id;
       this.name = name;
       this.code = code;
       this.description = description;
       this.quantity = quantity;
       this.price = price;
       this.status = status
       this.createdBy = createdBy
       this.createdTime = createdTime
       this.updatedBy = updatedBy
       this.updatedTime = updatedTime
       this.expand = false
       this.userId = userId
   }
}
