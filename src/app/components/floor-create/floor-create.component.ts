import { Component, Input } from '@angular/core';
import { UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Floor } from 'src/app/models/Floor';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-floor-create',
  templateUrl: './floor-create.component.html',
  styleUrls: ['./floor-create.component.css']
})
export class FloorCreateComponent {

  validateForm! : UntypedFormGroup;

  @Input()
  building : any

  constructor(private fb: UntypedFormBuilder, private restApi : RestapiService, private notification: NzMessageService
    ){

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],

  })}

  submitForm()
  {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.handleFloorCreation(this.validateForm.value)
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
list:boolean=false
  handleFloorCreation(floor : Floor)
  {
    floor.buildingId = this.building.id
    this.restApi.addFloor(floor).subscribe(
      data=>{
        console.log("Success", data)
        this.notification.success("Floor Created Successfully")
        this.list=true
      },
      error=>{
        console.log("Failed", error)
        this.notification.error("Failed to create Floor")
      }
    )
  }

}
