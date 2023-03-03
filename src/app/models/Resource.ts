export class Resource {
  workOrderId: number;
  resourceId: number;
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
    this.resourceName = resourceName;
    this.resourceType = resourceType;
    this.availability = availability;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
    this.inventoryId = inventoryId;
  }
}
