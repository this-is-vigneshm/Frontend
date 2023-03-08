import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Area } from 'src/app/models/Area';
import { RestapiService } from 'src/app/restapi.service';
@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.css']
})
export class AreaCreateComponent {

  validateForm! : UntypedFormGroup;

  @Input()
  floor : any

  constructor(private fb: UntypedFormBuilder, private restApi : RestapiService, private notification: NzMessageService
    ){

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],

  })}

  submitForm()
  {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.handleBuildingCreation(this.validateForm.value)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleBuildingCreation(area : Area)
  {
    area.floorId = this.floor.id
    this.restApi.addArea(area).subscribe(
      data=>{
        console.log("Success", data)
        this.notification.success("Area Created Successfully")
      },
      error=>{
        console.log("Failed", error)
        this.notification.error("Failed to create Area")
      }
    )
  }
}