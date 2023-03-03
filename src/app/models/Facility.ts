export class Facility {
    
    facilityId: number;
    facilityCode: string;
    facilityName: string;
    facilityType: string;
    facilitySource: string;
    inactiveDate: string;
    facLocationCode: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    postalCode: number;
    country: string;
    createdTime: number;
    createdBy: string;
    lastUpdatedTime: number;
    lastUpdatedBy: string;
    dagRunId: string;
    taskIdJobId: string;
    crossCodeFlag: boolean;
    expand: boolean = false;
    userId:number;

    public constructor(facilityId: number, facilityCode: string,
        facilityName: string, facilityType: string,
        facilitySource: string, inactiveDate: string,
        facLocationCode: string, addressLine1: string,
        addressLine2: string, addressLine3: string,
        city: string, state: string, postalCode: number,
        country: string, createdTime: number,  createdBy: string,
        lastUpdatedTime: number, lastUpdatedBy: string,  dagRunId: string,
        taskIdJobId: string,  crossCodeFlag: boolean, userId:number) 
        {
            this.facilityId = facilityId,
            this.facilityCode = facilityCode,
            this.facilityName = facilityName,
            this.facilityType = facilityType,
            this.facilitySource = facilitySource,
            this.inactiveDate = inactiveDate,
            this.facLocationCode = facLocationCode,
            this.addressLine1 = addressLine1,
            this.addressLine2 = addressLine2,
            this.addressLine3 = addressLine3,
            this.city = city,
            this.state = state,
            this.postalCode = postalCode,
            this.country = country,
            this.createdTime = createdTime,
            this.createdBy = createdBy,
            this.lastUpdatedTime = lastUpdatedTime,
            this.lastUpdatedBy = lastUpdatedBy,
            this.dagRunId = dagRunId,
            this.taskIdJobId = taskIdJobId,
            this.crossCodeFlag = crossCodeFlag
            this.expand = false
            this.userId = userId
    }
}