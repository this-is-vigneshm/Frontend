export class UpdateWorkOrderStatusReq {

    orderNo : number;
    status : String;
    name : string;
    assignedTo : number;
    userId : number;

    constructor(orderNo : number,status : String,name : string,
    assignedTo : number,userId : number){
        this.orderNo = orderNo
        this.status = status
        this.name = name
        this.assignedTo = assignedTo
        this.userId = userId

    }
}
