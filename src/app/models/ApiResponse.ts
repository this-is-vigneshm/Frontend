export class ApiResponse{

    responseCode:string;
    responseMessage:string;
    responseData: any
    constructor(responseCode:string, responseMessage:string, responseData: any){
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
        this.responseData = responseData;
    }
}