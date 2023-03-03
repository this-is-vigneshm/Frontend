export class Ticket {
    title: string;
    description: string;
    status: string;
    category: string;
    employeeId: string;
    issueType: string;
    assetId: string;
    userId: number
    expectedCompletionTime: number

    constructor(title: string, description: string,
        category: string, status: string, employeeId: string,
        issueType: string, assetId: string, userId: number,
        expectedCompletionTime: number) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status
        this.employeeId = employeeId
        this.issueType = issueType
        this.assetId = assetId
        this.userId = userId
        this.expectedCompletionTime = expectedCompletionTime
    }

}