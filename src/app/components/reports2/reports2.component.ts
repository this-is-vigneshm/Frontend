import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';
import { Router, NavigationExtras } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { Reports3D } from 'src/app/models/reports3-d';
Chart.register(...registerables)

interface datasets{
  label:string
  data:any
}

@Component({
  selector: 'app-reports1',
  templateUrl: './reports2.component.html',
  styleUrls: ['./reports2.component.css']
})
export class ReportsComponent2 implements OnInit{
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

  repoList: Reports3D[] = [];
  getAllReports() {
    this.restApiService.viewRadar().subscribe(
      data => {
        console.log("Success", data)
        this.repoList = data.responseData;
        this.notification.success("Reports is Found!")
        console.log("hi",this.repoList)
        this.newChart(this.repoList);
      },
      error => {
        console.log("Error occurred", error);
        this.notification.error("Error getting the reports!")
      }
    );
  }

  data : datasets[] = []
  
  newChart(a : Reports3D[]) {
    this.data=[]
    for(var i of a)
    {
      this.data.push({
          label:i.category,
          data:i.values
        })
    }
    this.myChart = new Chart( "myChart", {
      type: 'radar',
      data: {
        labels: a[0].label ,
        datasets: this.data,
      },
      options: {
        'onClick' : (evt, chartElements) =>  {
        this.handlecick(chartElements[0].index)
        },
        plugins: {
          title: {
              display: true,
              text: 'Monthly Report',
              font:{size:20},
              align:'center'
          }
      },
      scales: {
        r: {
            suggestedMin: 10
        }
    }
      }
    });
  }

  handlecick(a : number)
  {
    console.log(a)
    let n : NavigationExtras
    let aa =  this.repoList[a].listUuid
    n = { queryParams:{ "listUuid" : aa}}
    this.router.navigate(["reports-table"], n)
  }
}
