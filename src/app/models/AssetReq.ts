export class AssetReq{
    name : string;
    description: string
    price: number
    facilityCode : string

    constructor(name : string, description: string,
        price: number, facilityCode : string){
            this.name = name
            this.description = description
            this.price = price
            this.facilityCode =facilityCode
        }
}