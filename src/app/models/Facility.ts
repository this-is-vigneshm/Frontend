export class Facility {
    
    facilityId: number;
    facilityCode: string;
    facilityName: string;
    facilityType: string;
    facilitySource: string;
    inactiveDate: string;
    createdTime: number;
    createdBy: string;
    lastUpdatedTime: number;
    lastUpdatedBy: string;
    expand: boolean = false;
    userId:number;

    public constructor(facilityId: number, facilityCode: string,
        facilityName: string, facilityType: string,
        facilitySource: string, inactiveDate: string, createdTime: number,  createdBy: string,
        lastUpdatedTime: number, lastUpdatedBy: string, userId:number) 
        {
            this.facilityId = facilityId,
            this.facilityCode = facilityCode,
            this.facilityName = facilityName,
            this.facilityType = facilityType,
            this.facilitySource = facilitySource,
            this.inactiveDate = inactiveDate,
            this.createdTime = createdTime,
            this.createdBy = createdBy,
            this.lastUpdatedTime = lastUpdatedTime,
            this.lastUpdatedBy = lastUpdatedBy,
            this.expand = false,
            this.userId = userId
    }
}