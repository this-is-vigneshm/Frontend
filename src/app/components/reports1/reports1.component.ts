import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';
import { Router, NavigationExtras } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';
import { Reports } from 'src/app/models/Reports';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-reports1',
  templateUrl: './reports1.component.html',
  styleUrls: ['./reports1.component.css']
})
export class ReportsComponent1 implements OnInit{
  constructor(private restApiService: RestapiService, private notification: NzMessageService, private router: Router, private tokenService: TokenService)
  {
  }

  public myChart : any
  ngOnInit(): void {
    if (this.tokenService.getToken() === null) {
      this.router.navigateByUrl("/signin");
      window.location.pathname = "/signin"
      
    } 
    else {
     this.getAllReports();
    }
  }

  repoList: Reports[] = [];
  getAllReports() {
    this.restApiService.viewCalculateAmountSpent().subscribe(
      data => {
        console.log("Success", data)
        this.repoList = data.responseData;
        this.notification.success("Reports is Found!")
        this.newChart(this.repoList);
      },
      error => {
        console.log("Error occurred", error);
        this.notification.error("Error getting the reports!")
      }
    );
  }

  newChart(a : Reports[]) {
    this.myChart = new Chart( "myChart", {
      type: 'doughnut',
      data: {
        labels: a.map(m=>m.category),
        datasets: [{
          data: a.map(m =>m.values),
          hoverOffset : 10
        }],
      },
      options: {
        'onClick' : (evt, chartElements) =>  {
        this.handlecick(chartElements[0].index)
        },
        plugins: {
          title: {
              display: true,
              text: 'Amount Spent Report',
              font:{size:20},
              align:'center'
          }
      }
      }
    });
  }

  handlecick(a : number)
  {
    let n : NavigationExtras
    let aa =  this.repoList[a].listUuid
    n = { queryParams:{ "listUuid" : aa}}
    this.router.navigate(["reports-table"], n)
  }
}
