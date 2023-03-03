import { Component, Input } from '@angular/core';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.css'  ]
})
export class LayoutComponent {

  @Input()
  jwtToken: any;

  username = "Dhinesh"

  userData : any ;

  constructor(private tokenService: TokenService){
    if(tokenService.getToken() !== null){
      this.userData = tokenService.getCurrentUserData();
    }
  }

  logoutHandler(){
    localStorage.clear();
    window.location.replace("/signin");
  }
}
