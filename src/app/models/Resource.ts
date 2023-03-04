export class Resource {
  workOrderId: number;
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
    workOrderId: number,
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
    this.workOrderId = workOrderId;
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
