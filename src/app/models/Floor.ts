export class Floor {

    id : number
    name : string
    buildingId : number
    expand : boolean;
    constructor(id : number, name : string, buildingId : number,expand : boolean){
        this.id = id
        this.name = name
        this.buildingId = buildingId
        this.expand = expand 
        }
}
