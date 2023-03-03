export class UpdateWorkOrderStatusReq {

    orderNo : number;
    status : String;
    name : string;

    userId : number;

    constructor(orderNo : number,status : String,name : string,
    userId : number){
        this.orderNo = orderNo
        this.status = status
        this.name = name
        this.userId = userId

    }
}
