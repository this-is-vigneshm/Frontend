export class TicketResp {
    uuid: string;
    title: string;
    description: string
    category: string;
    status: string;
    employeeId: string;
    employeeName: string
    employeeMail: string
    employeeDepartment: string;
    issueTYpe : string
    assetId : string
    workOrderId : number
    createdBy:string;
    createdTime: number;
    updatedBy: string;
    updatedTime: number;
    timeTaken: number;
    expand : boolean = false
    expectedCompletionTime: number;


    constructor(uuid: string,
        title: string,
        description: string,
        category: string,
        status: string,
        employeeId: string,
        employeeName: string,
        employeeMail: string,
        employeeDepartment: string,
        issueTYpe : string,
        assetId : string,
        workOrderId : number, 
        createdBy:string,
        createdTime: number,
        updatedBy: string,
        updatedTime: number,
        timeTaken: number,
        expectedCompletionTime: number) {
        this.uuid= uuid;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status
        this.employeeId = employeeId
        this.employeeName = employeeName;
        this.employeeMail = employeeMail;
        this.employeeDepartment = employeeDepartment
        this.issueTYpe = issueTYpe
        this.assetId=assetId
        this.workOrderId = workOrderId
        this.createdBy = createdBy
        this.createdTime = createdTime
        this.updatedBy = updatedBy
        this.updatedTime = updatedTime
        this.timeTaken = timeTaken
        this.expand = false
        this.expectedCompletionTime = expectedCompletionTime
    }

}