import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Inventory } from 'src/app/models/Inventory';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';
@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css'],
})
export class InventoryCreateComponent {
  @Input()
  inventoryData!: Inventory | null;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  isUpdateComponent: boolean = false;

  userData: any;

  validateForm!: UntypedFormGroup;
  file: any;

  inventory = "Register"
  inventory1 = "Create"

  status = [
    { name: 'Available' },
    { name: 'Not Available'},
  ];

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      if (!this.isUpdateComponent) {
        this.createItemByData(this.validateForm.value,this.file);
      } else {
        this.updateItemData(this.validateForm.value);
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
  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigateByUrl('/signin');
      window.location.pathname = '/signin';
    }
    this.userData = this.tokenService.getCurrentUserData();
    if (this.inventoryData == null) {
      this.validateForm = this.fb.group({
        name: [
          null,
          [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
        ],
        code: [null, [Validators.required]],
        description: [null, [Validators.required]],
        quantity: [
          null,
          [
            Validators.required,
            Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
          ],
        ],
        price: [
          null,
          [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
        ],
        status:[null,[Validators.required]],

      });
    } else {
      this.isUpdateComponent = true;
      this.inventory = "Update"
      this.inventory1  = "Manage"
      this.validateForm = this.fb.group({
        id: [this.inventoryData.id, Validators.required],
        name: [this.inventoryData.name, [Validators.required]],
        code: [this.inventoryData.code, [Validators.required]],
        description: [this.inventoryData.description, [Validators.required]],
        quantity: [this.inventoryData.quantity, [Validators.required]],
        price: [
          this.inventoryData.price,
          [Validators.required, Validators.pattern],
        ],
        status:[this.inventoryData.status, [Validators.required]]
      });
    }
  }
id : any;
  createItemByData(inventory: Inventory,file:File) {
    inventory.userId = this.userData.userId;
    inventory.id = this.id;
    this.restService.registerItem(inventory, file).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('Item Created Successfully.');
        this.router.navigateByUrl('/inventory');
        this.handleClose();
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }

  // createItemByData(workorder: WorkOrder, file: File) {
  //   workorder.employeeId = this.userData.userId
  //   workorder.status = "Active"
  //   workorder.emailId = this.emailId
  //   workorder.phoneNumber = this.phNo
  //   workorder.name = this.name
  //   console.log('submit', this.validateForm.value);
  //   this.restService.registerWo(workorder, file).subscribe(
  //     data => {
  //       console.log("Success", data)
  //       this.notification.success("Workorder Created Successfully.")
  //       //  this.router.navigateByUrl("/");
  //       this.isVisibleMiddle = true;
  //       this.id = data.responseData
  //     },
  //     error => {
  //       console.log("Error occcured", error)
  //     }
  //   );
  // }



  updateItemData(inventory: any) {
    console.log('Updating............');
    inventory.userId = this.userData.userId;
    this.restService.updateItem(inventory.id, inventory).subscribe(
      (data) => {
        console.log('Success', data);
        this.notification.success('inventory Updated Successfully.');
        this.router.navigateByUrl('/inventory');
        this.handleClose();
      },
      (error) => {
        console.log('Error occcured', error);
      }
    );
  }
  handleClose() {
    this.isUpdateComponent = false;
    this.inventoryData = null;
    this.close.emit();
  }

  handleChange(event: any) {
    this.file = event.target.files[0]
  }
}