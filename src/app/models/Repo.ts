import { Employee } from "./Employee";

export class Repo {
    id : number;
    name: string;
    asset_name: string;
    user: Employee;
    uploaded_time: number;
    constructor(id : number, name: string, asset_name: string, user: Employee, uploaded_time: number){
        this.id = id;
        this.name = name;
        this.asset_name = asset_name;
        this.user = user;
        this.uploaded_time = uploaded_time;
    }
}
