import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from 'src/app/models/Inventory';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent {
  @Input()
  inventoryId: any;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  inventory!: Inventory 

  imageToShow: any = null;

  showSpinner: boolean = true;

  constructor(
    private restApi: RestapiService ) {}
  ngOnInit(): void {
    this.getInventory(this.inventoryId);
  }

  getInventory(inventoryId: number) {
    this.restApi.getByItemId(inventoryId).subscribe(
      (data) => {
        console.log('success', data);
        this.inventory = data.responseData;
        this.retreiveImage(this.inventory.id);
      },
      (error) => {
        console.log('Failed to fetch Inventory Details', error);
      }
    );
  }

  retreiveImage(id: number) {
    this.restApi.downloadInventoryImg(id).subscribe(image => this.createImage(image)
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