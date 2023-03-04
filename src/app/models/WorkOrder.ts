export class WorkOrder {

    ticketId: string
    orderNo:number;
    workOrderCode:string
    status: string;
    name: string;
    emailId: string;
    phoneNumber: number;
    description: string;
    workSubject: string;
    taskDetails: string;
    date: any;
    workOrderCost:number
    createdBy:string;
    createdTime: number;
    updatedBy: string;
    updatedTime: number;
    employeeId : number;
    expectedCompletionTime: number;

    constructor(ticketId: string, orderNo:number, workOrderCode: string,status: string,
        name: string, emailId: string,phoneNumber: number, description: string,workSubject: string,taskDetails:string,date:Date,workOrderCost:number, createdBy:string, createdTime: number, updatedBy: string,
        updatedTime: number, employeeId : number,expectedCompletionTime : number
     ) {
        this.ticketId = ticketId
        this.orderNo = orderNo;
        this.workOrderCode = workOrderCode
        this.status = status;
        this.name = name;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.workSubject = workSubject;
        this.taskDetails = taskDetails;
        this.date = date;
        this.workOrderCost = workOrderCost;
        this.createdBy = createdBy;
        this.createdTime = createdTime;
        this.updatedBy = updatedBy;
        this.updatedTime = updatedTime;
        this.employeeId = employeeId;
        this.expectedCompletionTime = expectedCompletionTime;
        }
}
