import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'my-app';

  token : any ='';

  isLoggedIn : boolean = false;
  isRegister: boolean =false

  constructor(private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem("access_token")){
      this.isLoggedIn = true;
      this.token = localStorage.getItem("access_token")
    }
  }

  handleLogin(){
    if(localStorage.getItem("access_token")){
      this.isLoggedIn = true;
      this.token = localStorage.getItem("access_token")
      this.router.navigateByUrl("/home")
    }
  }

  handleRegister(){
    this.isRegister = true;
  }
}
