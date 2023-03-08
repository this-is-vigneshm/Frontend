export class Building {
    id : number 
    name: string
    locationId : number
    constructor(id : number, name: string, locationId : number){
        this.id = id
        this.name = name
        this.locationId = locationId
    }
}
