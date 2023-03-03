import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.css']
})
export class RaiseRequestComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService, private restService: RestapiService, private notification: NzMessageService) { }

  isVisible = true;

  userData: any;

  assetList: any;

  ngOnInit(): void {
    this.userData = this.tokenService.getCurrentUserData();
  }
  handleModalCancel() {
    this.router.navigateByUrl("/home")
  }

  handleModalOk() {
    this.router.navigateByUrl("/tickets")
  }


  createTicketPan = {
    active: true,
    disabled: false,
    isFirst: false,
    name: 'This is panel header 1',
    icon: 'tool',
    customStyle: {
      background: '#f7f7f7',
      'border-radius': '10px',
      'margin-bottom': '5px',
      border: '0px',
      margin: '20px 50px'
    }
  }

  disabledPan = {
    active: false,
    disabled: true,
    isFirst: false,
    name: 'This is panel header 1',
    icon: 'tool',
    customStyle: {
      background: '#f7f7f7',
      'border-radius': '4px',
      'margin-bottom': '5px',
      border: '0px',
      margin: '20px 50px'
    }
  }

  panels = [
    {
      active: false,
      disabled: false,

      name: 'This is panel header 1',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px',
      }
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2',
      icon: 'double-right',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px',
        innerHeight: '300px'
      }
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3',
      customStyle: {
        background: '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px'
      }
    }
  ];


 
}
