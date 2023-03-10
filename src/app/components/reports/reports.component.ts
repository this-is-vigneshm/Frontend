import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';
import { Router, NavigationExtras } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';
import { Reports } from 'src/app/models/Reports';
import { Chart, registerables } from 'chart.js';
import { Ticket } from 'src/app/models/Ticket';
Chart.register(...registerables)

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
}) 
export default class ReportsComponent implements OnInit{
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
    this.restApiService.viewTimeline().subscribe(
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
      type: 'bar',
      data: {
        labels: a.map(m =>m.category),
        datasets: [{
          label:"# of tickets",
          data: a.map(m =>m.values),
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
