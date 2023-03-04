export class Resource {
  workOrderCode: string;
  resourceId: number;
  resourceCode : string
  resourceName: string;
  resourceType: string;
  availability: any;
  startDate: any;
  endDate: any;
  userId: any;
  inventoryId: any;

  constructor(
    workOrderCode: string,
    resourceId: number,
    resourceCode : string,
    resourceName: string,
    resourceType: string,
    availability: any,
    startDate: Date,
    endDate: Date,
    userId: number,
    inventoryId: number
  ) {
    this.workOrderCode = workOrderCode;
    this.resourceId = resourceId;
    this.resourceCode = resourceCode
    this.resourceName = resourceName;
    this.resourceType = resourceType;
    this.availability = availability;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
    this.inventoryId = inventoryId;
  }
}
