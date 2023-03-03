export class LoginRefreshReq{
    private username: string
    private refreshToken: string
    constructor(username: string, refreshToken: string){
        this.username = username
        this.refreshToken = refreshToken
     } 

     public getUsername() {
        return this.username;
    }

    public  setUsername(username: string) {
        this.username = username;
    } 
    
    public getRefreshToken() {
        return this.refreshToken;
    }

    public  setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken;
    }
}