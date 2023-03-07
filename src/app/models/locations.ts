export class Locations {
    id: number;
    name:string;
    description:string;
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
    expand: boolean = false;
    userId:number;

    public constructor(id:number, name:string, description:string, addressLine1: string,
        addressLine2: string, addressLine3: string,
        city: string, state: string, postalCode: number,
        country: string, createdTime: number,  createdBy: string,
        lastUpdatedTime: number, lastUpdatedBy: string, userId:number) 
        {
            this.id = id,
            this.name = name,
            this.description = description,
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
            this.expand = false
            this.userId = userId
    }
}
