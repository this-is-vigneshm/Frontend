import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder, private router: Router, private tokenService: TokenService,
    private notification: NzMessageService, private restApiService: RestapiService) { };

  validateForm!: UntypedFormGroup;

  @Output()
  onLogin: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onRegister: EventEmitter<void> = new EventEmitter<void>();


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.login(this.validateForm.value)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.tokenService.getToken() !== null) {
      this.router.navigateByUrl("/home")
    } else {
      this.notification.warning("Please Login to Continue!")
      this.validateForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
      });
    }

  }

  login(loginRequest: LoginRequest) {
    this.restApiService.login(loginRequest).subscribe(
      data => {
        this.tokenService.setToken(data.responseData.accessToken);
        this.notification.success("Login Successful!")
        this.router.navigateByUrl("/home")
        this.onLogin.emit()
      },
      error => {
        this.notification.error("Invalid Username/ Password");
        console.log("Error Occured", error);
      }
    )
  }

  handleRegister(){
      this.onRegister.emit();
  }
}
