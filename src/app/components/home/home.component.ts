import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private restApiService: RestapiService){};
  ngOnInit(): void {
    if(localStorage.getItem("access_token") === null){
      this.router.navigateByUrl("/signin");
      window.location.pathname="/signin"
    }
  }

}
