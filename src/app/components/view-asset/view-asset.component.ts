import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/Asset';
import { RestapiService } from 'src/app/restapi.service';


@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.css'],
})
export class ViewAssetComponent {
  @Input()
  assetId: any;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  asset!: Asset;

  imageToShow: any = null;

  showSpinner: boolean = true;

  constructor(private restApi: RestapiService) {}
  ngOnInit(): void {
    this.getAssetById(this.assetId);
  }

  getAssetById(assetId: number) {
    this.restApi.getAssetById(assetId).subscribe(
      (data: { responseData: Asset }) => {
        console.log('success', data);
        this.asset = data.responseData;
        this.retreiveImage(this.asset.id);
      },
      (error: any) => {
        console.log('Failed to fetch Work Asset Details', error);
      }
    );
  }

  retreiveImage(id: number) {
    this.restApi
      .downloadImage(id)
      .subscribe((image) => this.createImage(image));
  }

  createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          this.imageToShow = reader.result;
          this.showSpinner = false;
        },
        false
      );

      reader.readAsDataURL(image);
    } else {
      this.showSpinner = false;
    }
  }
}
