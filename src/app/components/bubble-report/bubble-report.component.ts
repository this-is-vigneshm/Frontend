import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';
import { Router, NavigationExtras } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import { Reports3D } from 'src/app/models/reports3-d';
import { BubbleChart } from 'src/app/models/bubble-chart';
Chart.register(...registerables)

interface datasets{
  label:string
  data : data[]
}

interface data{
  x:any
  y:any
  r:any
}

@Component({
  selector: 'app-bubble-report',
  templateUrl: './bubble-report.component.html',
  styleUrls: ['./bubble-report.component.css']
})
export class BubbleReportComponent implements OnInit{
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

  repoList: BubbleChart[] = [];
  getAllReports() {
    this.restApiService.viewBubble().subscribe(
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
  d : data[] = []
  
  newChart(a : BubbleChart[]) {
    for(var i of a)
    {
      var aa= 1
      for(var j of i.label)
      {
        inner_loop:
        for(var k of i.values)
        {
          for(var l of i.number)
          { 
            aa+=10 
            this.d.push({x:aa,y:k,r:l*5})
            break inner_loop
        }
        }
      }
      this.data.push({
          label:i.category,
          data: this.d
        })
    }
    this.myChart = new Chart( "myChart", {
      type: 'bubble',
      data: {
        datasets:this.data
      },
    });
  }


}
