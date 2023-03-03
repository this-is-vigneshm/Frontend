export class BubbleChart {

    category : string
    label : any
    values : any
    number : any

    constructor( category : string, label : string, values : number, number : any)
    {
        this.category = category
        this.label = label
        this.values = values
        this.number = number
    }
}
