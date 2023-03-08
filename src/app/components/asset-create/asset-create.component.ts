import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Asset } from 'src/app/models/Asset';
import { Facility } from 'src/app/models/Facility';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Locations } from 'src/app/models/locations';
import { Building } from 'src/app/models/Building';
import { Floor } from 'src/app/models/Floor';
import { Area } from 'src/app/models/Area';
import { Room } from 'src/app/models/Room';
import { AssetReq } from 'src/app/models/AssetReq';

@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.css'],
})
export class AssetCreateComponent implements OnInit {
  @Input()
  assetData!: Asset | null;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  isUpdateComponent: boolean = false;

  userData: any;

  facilities: Facility[] = [];

  validateForm!: UntypedFormGroup;
  locations : Locations[] =[]
  buildings: Building[]= []
  floors: Floor[]= []
  areas: Area[]=[]
  rooms: Room[]=[]

  options : any

  categories = [
    { name: 'Boiler tube', value: 'Electrical' },
    { name: 'Display', value: 'Electronics', id: '1' },
    { name: 'Ac motor', value: 'Electronics', id: '2' },
    { name: 'Keyboard', value: 'Electronics', id: '3' },
  ];
  departments = [
    { name: 'Facilities', id: '1' },
    { name: 'Employee', id: '2' },
  ];
  suppliers = [
    { name: 'Asus', id: '1' },
    { name: 'Lenovo', id: '2' },
  ];
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      if (!this.isUpdateComponent) {
        var b = this.validateForm.value
        var asset = new AssetReq(b.name, b.code, b.serialNo, b.description, b.facilityCode, this.areaId, this.roomId, b.category, b.department, b.subAsset, b.system, b.supplier, b.status, b.priority, b.make, b.model, b.price, this.userData.userId)
        this.createAssetByData(asset);
      } else {
        this.updateAssetData(this.validateForm.value);
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NzMessageService,
    private restService: RestapiService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.notification.success(`${file.name} file uploaded successfully.`);
      this.router.navigateByUrl('/assets/create');
    } else if (status === 'error') {
      this.notification.error(`${file.name} file upload failed.`);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigateByUrl('/signin');
      window.location.pathname = '/signin';
    }
    this.getAllLocation()
    this.getAllFacilities();
    this.userData = this.tokenService.getCurrentUserData();
    if (this.assetData == null) {
      this.validateForm = this.fb.group({
        name: [
          null,
          [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
        ],
        code: [
          null,
          [
            Validators.required,
            Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
          ],
        ],
        serialNo: [
          null,
          [
            Validators.required,
            Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
          ],
        ],
        description: [
          null,
          [
            Validators.required,
            Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
          ],
        ],
        facilityCode:[],

        location:[],
        building:[],
        floor:[],
        raname:[],
        arname:[],
        category: [null, [Validators.required]],
        department: [null, [Validators.required]],
        subAsset: [
          null,
          [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
        ],
        system: [
          null,
          [
            Validators.required,
            Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
          ],
        ],
        supplier: [null, [Validators.required]],
        status: [null, [Validators.required]],
        priority: [null, [Validators.required]],

        make: [null, [Validators.required]],
        model: [
          null,
          [
            Validators.required,
            Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
          ],
        ],
        price: [
          null,
          [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
        ],

      });
    } else {
      this.isUpdateComponent = true;
      this.validateForm = this.fb.group({
        id: [this.assetData.id, Validators.required],
        name: [this.assetData.name, [Validators.required]],
        code: [this.assetData.code, [Validators.required]],
        serialNo: [this.assetData.serialNo, [Validators.required]],
        description: [this.assetData.description, [Validators.required]],
        category: [this.assetData.category, [Validators.required]],
        department: [this.assetData.department, [Validators.required]],
        subAsset: [this.assetData.subAsset, [Validators.required]],
        system: [this.assetData.system, [Validators.required]],
        supplier: [this.assetData.supplier, [Validators.required]],
        status: [this.assetData.status, [Validators.required]],
        priority: [this.assetData.priority, [Validators.required]],
        make: [this.assetData.make, [Validators.required]],
        model: [this.assetData.model, [Validators.required]],
        price: [
          this.assetData.price,
          [Validators.required, Validators.pattern],
        ],
        facilityCode: [
          this.assetData.location.facilityCode,
          [Validators.required],
        ],
      });
    }
  }

  createAssetByData(asset: AssetReq) {
    asset.room = this.roomId
    asset.area = this.areaId
    asset.userId = this.userData.userId;
    this.restService.registerAsset(asset).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('Asset Created Successfully.');
        this.router.navigateByUrl('/assets');
        this.handleClose();
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }

  updateAssetData(asset: any) {
    console.log('Updating............');
    asset.userId = this.userData.userId;
    this.restService.updateAsset(asset.id, asset).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('Asset Updated Successfully.');
        this.router.navigateByUrl('/assets');
        this.handleClose();
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }

  createAssetByCsv(file: any) {
    this.restService.addAssetByCsv(file).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('Assets Created Successfully.');
        this.router.navigateByUrl('/assets');
        this.handleClose();
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }

  handleClose() {
    this.isUpdateComponent = false;
    this.assetData = null;
    this.close.emit();
  }

  getAllFacilities() {
    this.restService.getAllFacilities().subscribe(
      (data) => {
        console.log('Data Obtained', data);
        this.notification.success('Facility List Obtained!');
        this.facilities = data.responseData;
      },
      (error) => {
        console.log('Error Occurred', error);
        this.notification.error('Facility Fetching Failed!');
      }
    );
  }
  onStatusChange(event: any) {}
  defaultFileList: NzUploadFile[] = [];

  fileList1 = [...this.defaultFileList];
  fileList2 = [...this.defaultFileList];

  getAllLocation(){
    this.restService.getAllLocations().subscribe(
      data=>{
          console.log('Location Fetched Successfully', data)
          this.locations = data.responseData;
      },
      error=>{
        console.log('Locations Fetching Failed',error)
      }
    )
  }


  getAllBuilding(id:any){
    console.log(id)
    this.restService.getAllBuildingByLocation(id).subscribe(
      data=>{
          console.log('Building Fetched Successfully', data)
          this.buildings = data.responseData;
      },
      error=>{
        console.log('Building Fetching Failed',error)
      }
    )
  }
  getAllFloor(id:any){
    console.log(id)
    this.restService.getAllFloorByBuilding(id).subscribe(
      data=>{
          console.log('Floor Fetched Successfully', data)
          this.floors = data.responseData;
      },
      error=>{
        console.log('Floor Fetching Failed',error)
      }
    )
  }
  getAllRoomAndArea(id:any){
    console.log(id)
    
    this.restService.getAllAreaByFloor(id).subscribe(
      data=>{
          console.log('Area Fetched Successfully', data)
          this.areas = data.responseData;
      },
      error=>{
        console.log('Area Fetching Failed',error)
      }
    )
    this.restService.getAllRoomByFloor(id).subscribe(
      data=>{
          console.log('Room Fetched Successfully', data)
          this.rooms = data.responseData;
      },
      error=>{
        console.log('Room Fetching Failed',error)
      }
    )
  }

  selectedOption : any
  getOptions(name : any)
  {
    this.selectedOption = name
    if(name == "Area")
    {
      this.options = this.areas
    }
    else{
      this.options = this.rooms
    }
  }
  areaId:any
  roomId:any
  getId(id : any){
    if(this.selectedOption == "Area")
    {
      this.areaId = id
      this.roomId = 0
    }
    else{
      this.areaId = 0
      this.roomId = id
    }

  }

}
