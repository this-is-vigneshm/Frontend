export class allocate{
    resourceid:number
    resourceName:string
    resourcetype:string
    productName:any
    location:string
    assignedBy:string


   
   constructor( resourceid:number,
    resourceName:string,
    resourcetype:string,
    productName:any,
    location:string,
    assignedBy:string,){
       this.resourceid = resourceid;
       this.resourceName = resourceName;
       this.resourcetype=resourcetype,
       this.location=location,
       this.assignedBy=assignedBy
   }
}