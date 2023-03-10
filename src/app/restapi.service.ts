import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from './models/ApiResponse';
import { Asset } from './models/Asset';
import { Employee } from './models/Employee';
import { Facility } from './models/Facility';
import { LoginRefreshReq } from './models/LoginRefreshReq';
import { LoginRequest } from './models/LoginRequest';
import { Ticket } from './models/Ticket';
import { UpdateStatusReq } from './models/UpdateStatusReq';
import { UpdateWorkOrderStatusReq } from './models/UpdateWorkOrderStatusReq';
import { TokenService } from './token.service';
import { Resource } from './models/Resource';
import { WorkOrder } from './models/WorkOrder';
import { Inventory } from './models/Inventory';
import { Floor } from './models/Floor';
import { Building } from './models/Building';
import { Room } from './models/Room';
import { EmployeeStatus } from './models/EmployeeStatus';
import { Locations } from './models/locations';
import { Area } from './models/Area';
import { AssetReq } from './models/AssetReq';

// import { TicketRe } from './models/TicketResp';

const reqOptions = {
  headers: {},
};

@Injectable({
  providedIn: 'root',
})
export class RestapiService {
  private baseUrl = 'http://localhost:8084';
  accessToken: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.accessToken =
      localStorage.getItem('access_token') !== null
        ? localStorage.getItem('access_token')
        : '';
  }

  public registerAsset(assetDto: AssetReq, file:File) {
    var formData = new FormData()
    formData.append("Asset", JSON.stringify(assetDto))
    formData.append("file", file);
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/assets/save`,formData);
  }

  public getAssets() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/assets/list`);
  }
  public getAssetById(assetId: number) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/assets/${assetId}`
    );
  }

  public updateAsset(assetId: number, assetDto: Asset) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/assets/${assetId}`,
      assetDto
    );
  }

  public deleteAsset(assetId: number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/assets/${assetId}`
    );
  }

  public getAssetsByFacility(facility: string) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/assets/facilities/${facility}`
    );
  }

  public addAssetByCsv(file: any) {
    var formData = new FormData();
    console.log('Inside Calling');

    formData.append('file', file);
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/assets/csv`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8',
        },
      }
    );
  }

  public downloadImage(id : any){
    return this.httpClient.get(`${this.baseUrl}/assets/download/${id}`,
    { responseType: 'blob' }
  );
  }
  //  inventory APIS

  public registerItem(inventory : Inventory, file:File) {
    var formData = new FormData()
    formData.append("inventory", JSON.stringify(inventory));
    formData.append("file", file);
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/inventory/save`, formData);
  }

  public getItem() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/inventory/list`);
  }
  public getByItemId(itemId:number) {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/inventory/${itemId}`);
  }

  public updateItem(itemId: number ,inventory : Inventory) {
    return this.httpClient.put<ApiResponse>(`${this.baseUrl}/inventory/${itemId}`, inventory);
  }

  public deleteItem(itemId: number ) {
    return this.httpClient.delete<ApiResponse>(`${this.baseUrl}/inventory/${itemId}`);
  }
  public downloadInventoryImg(id: number) {
    return this.httpClient.get(`${this.baseUrl}/inventory/download/${id}`,{ responseType: 'blob' });  
  }

  //Authenticate APIS:

  public login(loginRequest: LoginRequest) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/authenticate/login`,
      loginRequest
    );
  }

  public refreshLogin(refreshRequest: LoginRefreshReq) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/authenticate/login`,
      refreshRequest
    );
  }

  // Employee APIS:

  public registerEmployee(employee: Employee) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/employees/save`,
      employee
    );
  }

  public getEmployees() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/employees/list`);
  }

  public getEmployeeById(empId: number) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/employees/${empId}`
    );
  }

  public updateEmployee(empId: number, employee: Employee) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/employees/${empId}`,
      employee
    );
  }
  public getEmployeesByTypes(usertype:string) {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/employees/usertype/${usertype}`);
  }

  public updateEmployeeStatus(id: number , employeeStatus : EmployeeStatus) {
    return this.httpClient.put<ApiResponse>
    (`${this.baseUrl}/employees/status/${id}`, employeeStatus);
  }

  //Ticket APIS:

  public createTicketAndMail(ticket: Ticket) {
    var formData = new FormData();
    formData.append('ticketBody', JSON.stringify(ticket));
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/tickets/mail`,
      formData
    );
  }

  public createTicketAndMailWithAttachment(ticket: Ticket, file: File) {
    var formData = new FormData();
    formData.append('ticketBody', JSON.stringify(ticket));
    formData.append('file', file);
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/tickets/mail`,
      formData
    );
  }


  public getAllTickets() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/tickets/list`);
  }

  public getAllTicketsByStatus(status: string) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/tickets/list/status/${status}`
    );
  }

  public updateTicketStatus(ticketId: UpdateStatusReq) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/tickets/status`,
      ticketId
    );
  }

  public getAllTicketsEmployeeId(empId: number) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/tickets/list/employees/${empId}`
    );
  }

  public getTicket(ticketId: String) {
    return this.httpClient.get<ApiResponse>(
      `${this.baseUrl}/tickets/${ticketId}`
    );
  }

  public setWOId(workOrderId : number, ticketId : string)
  {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/tickets/WOId/${ticketId}`,workOrderId)
  }
  public downloadTicketImg(id: string) {
    console.log(id)
    return this.httpClient.get(`${this.baseUrl}/tickets/download/${id}`,{ responseType: 'blob' });  
  }
  // Knowedge Repo

  
  public createkRepo(asset_name : String, file : File, userId  :any) {
    var formData = new FormData();
    formData.append("dto", JSON.stringify(asset_name));
    formData.append("file", file);
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/knowledgerepo/uploadfile/${userId}`, formData);
  }

  public getAllRepo() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/knowledgerepo/list`);
  }

  public deleteRepo(id: Number) {
    return this.httpClient.delete<ApiResponse>(`${this.baseUrl}/knowledgerepo/${id}`);
  }

  public downloadRepo(filename : string)
  {
    return this.httpClient.get(`http://localhost:8084/knowledgerepo/download/${filename}`,{observe: 'response', responseType : 'blob'}) 
  }
  //Facility APIS:

  public getAllFacilities() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/facilities/list`);
  }

  public createFacility(facility: Facility) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/facilities/save`,
      facility
    );
  }

  public deleteFacility(facilityId: number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/facilities/${facilityId}`
    );
  }

  ////////////////////////-resource planner-///////////////////////////////////////

  public registerResource(resourceDto: Resource) {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/resource/save`,
      resourceDto
    );
  }

  public getResourceById(id: number) {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/resource/${id}`);
  }
  public getAllResource() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/resource/list`);
  }
  public updateResource(id: number, resourceDto: Resource) {
    return this.httpClient.put<ApiResponse>(
      `${this.baseUrl}/resource/${id}`,
      resourceDto
    );
  }
  public deleteById(id: number) {
    return this.httpClient.delete<ApiResponse>(
      `${this.baseUrl}/resource/${id}`
    );
  }

// public getAssets() {
//   let headers1 = new HttpHeaders();
//   headers1.append("token", this.accessToken)
//   console.log("Tkoen", this.tokenService.getToken());
//   this.accessToken = this.tokenService.getToken()
//   console.log(headers1);
//   return this.httpClient.get<ApiResponse>(`${this.baseUrl}/assets/list`,  {headers:{"Authorization":this.accessToken}});
// }


// workorder APIS:
  public registerWo(workorder : WorkOrder, file:File) {
    var formData = new FormData();
    formData.append("workorder", JSON.stringify(workorder));
    formData.append("file", file);
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/workorder/save`, formData);
  }

  public updateWo(workorder: any){
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}/workorder/save`, workorder);
  }

  public getAllWorkOrders() {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/workorder/list`);
  }
  public deleteWo(orderNo: any) {
    return this.httpClient.delete<ApiResponse>(`${this.baseUrl}/workorder/${orderNo}`);
  }

  public getEmployeeByName(empName:string) {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/employees/name/${empName}`);
  }

  public getAllResourceByWorkOrderCode(workorderId:String) {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/resource/wo/${workorderId}`);
  }

  
  public updateWorkOrderStatus(workorderData: UpdateWorkOrderStatusReq){
    return this.httpClient.put<ApiResponse>(`${this.baseUrl}/resource/status/`,workorderData);
  }
  public downloadWorkOrderImg(id: number) {
    return this.httpClient.get(
      `${this.baseUrl}/workorder/download/${id}`,
      { responseType: 'blob' }
    );
  }


  public getWorkOrder(id: number) {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/workorder/${id}`);
  }


    //Reports

    public viewCalculateAmountSpent() {
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/reports/amount-spent`);
    }
  
    public viewTimeline(){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/reports/timeline`)
    }
  
   public viewRadar(){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/reports/radar`)
    }
    public viewBubble(){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/reports/bubble`)
    }
    public getValues(listUuId : string[]) {
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/reports/values`, {params: { listId : listUuId}});
    }
    //// locations

    public createLocation(location: Locations){
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/locations/save`,location);
    }

    public getAllLocations(){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/locations/list`)
    }
    public getLocationBycode(code : string){
        return this.httpClient.get<ApiResponse>(`${this.baseUrl}/locations/code/${code}`)
    }

    public getLocation(id:number){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/locations/${id}`)
    }

    // building

    public addBuilding(building : Building)
    {
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/building/save`,building)
    }
    public getAllBuilding(){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/building/list`)
    }
    public getAllBuildingByLocation(id : number){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/building/location/${id}`)
    }
    public getbuilding(id:number){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/building/${id}`)
    }


    // floor
    public addFloor(floor : Floor)
    {
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/floor/save`,floor)
    }
    public getAllFloor(){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/floor/list`)
    }
    public getAllFloorByBuilding(id : number){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/floor/building/${id}`)
    }
    public getFloor(id:number){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/floor/${id}`)
    }

    //room
    public addRoom(room : Room)
    {
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/room/save`,room)
    }
    public getAllRoomByFloor(id : number){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/room/floor/${id}`)
    }

    //  area
    public addArea(area : Area)
    {
      return this.httpClient.post<ApiResponse>(`${this.baseUrl}/area/save`,area)
    }
    public getAllAreaByFloor(id : number){
      return this.httpClient.get<ApiResponse>(`${this.baseUrl}/area/floor/${id}`)
    }
}
