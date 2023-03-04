import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Asset } from 'src/app/models/Asset';
import { Ticket } from 'src/app/models/Ticket';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';



@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  assetData: any;

  assetId: any = 0;

  assetList: any;

  @Input()
  ticketData: any;

  form: UntypedFormGroup;

  employees: any = [];

  userData: any;

  expectedTime: any = new Date().getTime();
  expectedTimeText: any = "0 Hours";

  file: File | null = null;

  statusList = [
    "Open",
    "In Progress",
    "Resolved",
    "Closed"
  ]

  categories = [
    { name: "Low Priority", value: "Green" },
    { name: "Medium Priority", value: "Yellow" },
    { name: "High Priority", value: "Orange" },
    { name: "Critical Issue", value: "Red" }
  ]

  issueTypes = [
    "Minor Repair",
    "Major Repair",
    "A safety hazard",
    "Replacement Required"
  ]


  submitForm(): void {
    if (this.form.valid) {
      console.log('submit', this.form.value);
      this.handleTicketCreation()
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private formBuilder: UntypedFormBuilder, private notification: NzMessageService,
    private restApiService: RestapiService, private router: Router, private tokenService: TokenService) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      status: ["Open", [Validators.required]],
      category: ["", [Validators.required]],
      employeeId: [null, [Validators.required]],
      userId: [null, [Validators.required]],
      issueType: [null, [Validators.required]],
      radio: [],
      assetId: [this.assetData != null ? this.assetData.id : null, []]
    })
    this.employees = this.getAllEmployees();
    this.getAssets();
  }

  ngOnInit(): void {
    this.employees = this.getAllEmployees();
    if (localStorage.getItem("access_token") === null) {
      this.router.navigateByUrl("/signin");
      window.location.pathname = "/signin"
    }
    this.userData = this.tokenService.getCurrentUserData()
    console.log("Asset Data ", this.assetData);
    this.assetId = this.assetData !== null ? this.assetData.id : 0;

  }

  handleTicketCreation() {
    var formData = this.form.value;
    var ticketData = new Ticket(formData.title, formData.description, formData.category,
      formData.status, formData.employeeId, formData.issueType, formData.assetId,0, formData.userId, this.expectedTime);
    if (this.file == null) {
      console.log("Without Attachment", ticketData);
      this.createTicketAndMail(ticketData)
    } else {
      console.log("With Attachment", ticketData, this.file);
      this.createTicketAndMailWithAttachment(ticketData, this.file)
    }

  }
data : any = null
  createTicketAndMail(ticketData: Ticket) {
    ticketData.userId = this.userData.userId;
    this.restApiService.createTicketAndMail(ticketData).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Ticket created Successfully.")
        this.isVisible = true;
        this.data = data.responseData
      },
      error => {
        console.log("Error occcured", error)
        this.notification.error("Ticket creation Failed")
      }
    );
  }
    createTicketAndMailWithAttachment(ticketData: Ticket, file: File) {

    this.restApiService.createTicketAndMailWithAttachment(ticketData, file).subscribe(
      data => {
        console.log("Success", data)
        this.notification.success("Ticket created Successfully.")
        this.isVisible = true;
        this.data = data.responseData
      },
      error => {
        console.log("Error occcured", error)
        this.notification.error("Ticket creation Failed")
      }
    );


  }


  getAllEmployees() {
    this.restApiService.getEmployees().subscribe(
      data => {
        this.employees = data.responseData;
        console.log("Employee Data Found", data);
      },
      error => {
        this.notification.error("Employee Fetching failed!")
        console.log("Error Occurred", error);
      }
    )
  }


  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onStatusChange(event: any) {
    switch (event) {
      case "Green":
        this.expectedTime = new Date().getTime() + 1209600000;
        this.expectedTimeText = "14 Days";
        break;
      case "Yellow":
        this.expectedTime = new Date().getTime() + 604800000;
        this.expectedTimeText = "7 Days";
        break;
      case "Orange":
        this.expectedTime = new Date().getTime() + 86400000 ;
        this.expectedTimeText = "1 Day";
        break;
      case "Red":
        this.expectedTime = new Date().getTime() + 14400000 ;
        this.expectedTimeText = "4 Hours";
        break;
    }
  }


  loading: boolean = false;
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
  }


  getAssets() {
    this.restApiService.getAssets().subscribe(
      data => {
        this.assetList = data.responseData;
        console.log(this.assetList)
      },
      error => {
        console.log("Error Occured", error);
        this.notification.error("Error Fetching Asset List!")
      }

    )
  }

  radioValue: boolean = false;
  isVisible = false;
  isConfirmLoading = false;

 

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}