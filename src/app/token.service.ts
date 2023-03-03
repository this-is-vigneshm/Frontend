import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
export class TokenService{

    getToken(){
        return localStorage.getItem("access_token");
    }

    setToken(token : string){
        localStorage.setItem("access_token",token);;
    }

    isTokenValid(){
        return localStorage.getItem("access_token") !== null ;
    }

    verifyToken(){
       return jwt_decode(localStorage.getItem("access_token")!);
    }

    getCurrentUserData(){
        return jwt_decode(localStorage.getItem("access_token")!);
    }
}