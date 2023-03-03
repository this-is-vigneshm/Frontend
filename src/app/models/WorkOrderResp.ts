export class WorkOrderResp {

    orderNo : number;
    status : string;
    name: string;
    emailId: string;
    employeeId: number;
    phoneNumber: number;
    description: string;
    workSubject:string
    taskDetails: string;
    date: any;
    workOrderCost:number;
    createdBy: string;
    createdTime: number;
    updatedBy: string;
    updatedTime: number;
    timeTaken: number;
    expand : boolean = false;
    expectedCompletionTime: number;


    constructor(orderNo:number, status: string,
       name: string, emailId: string,employeeId : number,
       phoneNumber: number, description: string,workSubject:string,
       taskDetails: string, date : Date,workOrderCost: number,createdBy: string,createdTime: number,
       updatedBy: string,updatedTime: number,timeTaken: number,
       expectedCompletionTime: number) {
        
       this.orderNo = orderNo;
       this.status = status;
       this.name = name;
       this.emailId = emailId
       this.employeeId = employeeId
       this.phoneNumber = phoneNumber
       this.description = description
       this.workSubject = workSubject
       this.taskDetails = taskDetails
       this.date = date
       this.workOrderCost= workOrderCost
       this.createdBy = createdBy
       this.createdTime = createdTime
       this.updatedBy = updatedBy
       this.updatedTime = updatedTime
       this.timeTaken = timeTaken
       this.expand = false
       this.expectedCompletionTime = expectedCompletionTime
       }
}
