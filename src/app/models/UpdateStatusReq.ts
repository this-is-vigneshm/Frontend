export class UpdateStatusReq {
    ticketId: string;
    status: string;
    amountSpent: number;
    userId: number;
    assignedTo:number

    constructor(ticketId: string,
        status: string,
        amountSpent: number,
        userId: number, assignedTo:number) {
            this.ticketId = ticketId;
            this.status = status;
            this.amountSpent = amountSpent;
            this.userId = userId;
            this.assignedTo = assignedTo;
    }
}