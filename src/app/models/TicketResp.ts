export class TicketResp {
    uuid: string;
    title: string;
    description: string;
    employeeName: string
    employeeMail: string
    category: string;
    status: string;
    employeeId: string;
    employeeDepartment: string;
    createdBy:string;
    createdTime: number;
    updatedBy: string;
    updatedTime: number;
    timeTaken: number;
    expand : boolean = false;
    expectedCompletionTime: number;

    constructor(uuid: string, title: string, description: string, 
        employeeName: string, employeeMail: string, category: string,
        status: string, employeeId: string, employeeDepartment: string,
        createdBy:string, createdTime: number, updatedBy: string,
        updatedTime: number, timeTaken: number, expectedCompletionTime:number) {
        this.uuid= uuid;
        this.title = title;
        this.description = description;
        this.employeeName = employeeName;
        this.employeeMail = employeeMail;
        this.category = category;
        this.status = status
        this.employeeId = employeeId
        this.employeeDepartment = employeeDepartment
        this.createdBy = createdBy
        this.createdTime = createdTime
        this.updatedBy = updatedBy
        this.updatedTime = updatedTime
        this.timeTaken = timeTaken
        this.expand = false
        this.expectedCompletionTime = expectedCompletionTime
    }

}