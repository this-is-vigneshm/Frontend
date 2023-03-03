import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  userData: any;

  userInitials: any;
  isAdmin: boolean = false;

  constructor(private tokenService: TokenService) {}
  ngOnInit(): void {
    this.userData = this.tokenService.getCurrentUserData();
    this.setUserInitials();
  }

  logoutHandler() {
    localStorage.clear();
    window.location.replace('/signin');
  }

  setUserInitials() {
    this.isAdmin = this.userData.roles.includes('ADMIN');
    const data = this.userData.sub.split(' ');
    this.userInitials = data[0].slice(0, 1) + data[1].slice(0, 1);
    console.log(this.userInitials);
  }
  // setUserInitials() {
  //   this.isAdmin = this.userData.roles.includes('ADMIN');
  //   const data = this.userData.sub.split(' ');
  //   if (data[0] && data[1]) {
  //     this.userInitials = data[0].slice(0, 1) + data[1].slice(0, 1);
  //     console.log(this.userInitials);
  //   }
  // }
}
