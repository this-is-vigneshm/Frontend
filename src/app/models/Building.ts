export class Building {
    id : number 
    name: string
    locationId : number
    expand : boolean;
    constructor(id : number, name: string, locationId : number,expand : boolean){
        this.id = id
        this.name = name
        this.locationId = locationId
        this.expand = expand
    }
}
