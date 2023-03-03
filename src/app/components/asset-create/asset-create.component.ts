import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Asset } from 'src/app/models/Asset';
import { Facility } from 'src/app/models/Facility';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';


@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.css']
})
export class AssetCreateComponent implements OnInit {

  @Input()
  assetData!: Asset | null;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  isUpdateComponent: boolean = false

  userData:any;

  facilities : Facility[] =[];

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      if(!this.isUpdateComponent){
        this.createAssetByData(this.validateForm.value)
      }else{
        this.updateAssetData(this.validateForm.value)
      }
      
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder, private notification: NzMessageService, private restService: RestapiService,
     private router: Router, private tokenService:TokenService) { }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.notification.success(`${file.name} file uploaded successfully.`);
      this.router.navigateByUrl("/assets/create")
    } else if (status === 'error') {
      this.notification.error(`${file.name} file upload failed.`);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("access_token") === null) {
      this.router.navigateByUrl("/signin");
      window.location.pathname = "/signin"
    }
    this.getAllFacilities();
    this.userData = this.tokenService.getCurrentUserData();
    if (this.assetData == null) {
      this.validateForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        price: [null, [Validators.required, Validators.pattern]],
        facilityCode: [null, [Validators.required]]
      });
    } else {
      this.isUpdateComponent = true;
      this.validateForm = this.fb.group({
        id: [this.assetData.id, Validators.required],
        name: [this.assetData.name, [Validators.required]],
        description: [this.assetData.description, [Validators.required]],
        price: [this.assetData.price, [Validators.required, Validators.pattern]],
        facilityCode: [this.assetData.location.facilityCode, [Validators.required]]
      });
    }

  }

  createAssetByData(asset: Asset) {
    asset.userId = this.userData.userId
    this.restService.registerAsset(asset).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Asset Created Successfully.")
        this.router.navigateByUrl("/assets");
        this.handleClose()
      },
      error => {
        console.log("Error occcured", error)
      }
    );
  }

  updateAssetData(asset: any) {
    console.log("Updating............");
    asset.userId = this.userData.userId
    this.restService.updateAsset(asset.id, asset).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Asset Updated Successfully.")
        this.router.navigateByUrl("/assets");
        this.handleClose()
      },
      error => {
        console.log("Error occcured", error)
      }
    );
  }

  createAssetByCsv(file: any) {

    this.restService.addAssetByCsv(file).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Assets Created Successfully.")
        this.router.navigateByUrl("/assets");
        this.handleClose()
      },
      error => {
        console.log("Error occcured", error)
      }
    );
  }

  handleClose(){
    this.isUpdateComponent = false;
    this.assetData = null;
    this.close.emit();
  }

  getAllFacilities(){
    this.restService.getAllFacilities().subscribe(
      data =>{
        console.log("Data Obtained", data);
        this.notification.success("Facility List Obtained!");
        this.facilities= data.responseData;
      },
      error=>{
        console.log("Error Occurred", error);
        this.notification.error("Facility Fetching Failed!");
      }
    );
  }
}
