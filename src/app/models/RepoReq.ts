export class RepoReq {

    id : number
    assetName: string;

    constructor(id : number, assetName : string)
    {
        this.id = id
        this.assetName = assetName
    }
}
