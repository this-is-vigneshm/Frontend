import { Component } from '@angular/core';
import { Building } from 'src/app/models/Building';
import { UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RestapiService } from 'src/app/restapi.service';


@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.css']
})
export class BuildingCreateComponent {



  validateForm! : UntypedFormGroup;


  constructor(private fb: UntypedFormBuilder, private restApi : RestapiService, private notification: NzMessageService
    ){

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      locationName: ['', [Validators.required]],

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

  handleBuildingCreation(building : Building)
  {
    this.restApi.addBuilding(building).subscribe(
      data=>{
        console.log("Success", data)
        this.notification.success("Building Created Successfully")
      },
      error=>{
        console.log("Failed", error)
        this.notification.error("Failed to create Building")
      }
    )
  }

}
