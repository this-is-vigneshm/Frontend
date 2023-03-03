export class LoginResponse{
    private accessToken: string
    private refreshToken: string
    private expiresIn: number
    constructor(accessToken: string, refreshToken: string, expiresIn: number){
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.expiresIn = expiresIn
     } 

     public getaccessToken() {
        return this.accessToken;
    }

    public  setaccessToken(accessToken: string) {
        this.accessToken = accessToken;
    } 
    
    public getRefreshToken() {
        return this.refreshToken;
    }

    public  setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken;
    }

    public getExpiresIn() {
        return this.expiresIn;
    }

    public  setExpiresIn(expiresIn: number) {
        this.expiresIn = expiresIn;
    }
}