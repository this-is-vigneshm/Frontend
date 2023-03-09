import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketResp } from 'src/app/models/TicketResp'; 
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent {
  @Input()
  ticketId: any;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  ticket!: TicketResp 

  imageToShow: any = null;

  showSpinner: boolean = true;

  constructor(
    private restApi: RestapiService ) {}
  ngOnInit(): void {
    this.getTicket(this.ticketId);
    this.retreiveImage(this.ticketId);
  }

  getTicket(ticketId: string) {
    this.restApi.getTicket(ticketId).subscribe(
      (data) => {
        console.log('success', data);
        this.ticket = data.responseData;
       
      },
      (error) => {
        console.log('Failed to fetch Ticket Details', error);
      }
    );
  }

  retreiveImage(id: string) {
    this.restApi.downloadTicketImg(id).subscribe(image => this.createImage(image)
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