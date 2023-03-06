import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { WorkOrder } from 'src/app/models/WorkOrder';
import { RestapiService } from 'src/app/restapi.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-workorder',
  templateUrl: './view-workorder.component.html',
  styleUrls: ['./view-workorder.component.css']
})
export class ViewWorkorderComponent {

  @Input()
  workOrderId: any;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  workOrder: WorkOrder[] = [];

  imageToShow: any = null;

  showSpinner: boolean = true;

  constructor(
    private restApi: RestapiService,
    private sanitizer: DomSanitizer,
  ) {}
  ngOnInit(): void {
    this.getWorkOrder(this.workOrderId);
  }

  getWorkOrder(workOrderId: number) {
    this.restApi.getWorkOrder(workOrderId).subscribe(
      (data) => {
        console.log('success', data);
        this.workOrder[0] = data.responseData;
        this.retreiveImage(this.workOrder[0].orderNo);
      },
      (error) => {
        console.log('Failed to fetch Work Order Details', error);
      }
    );
  }

  retreiveImage(id: number) {
    this.restApi.downloadWorkOrderImg(id).subscribe(image => this.createImage(image)
    );
  }

 createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
        this.showSpinner = false;
      }, false);

      reader.readAsDataURL(image);
    } else {
      this.showSpinner = false;
    }
  }
  
}
