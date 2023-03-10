import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Room } from 'src/app/models/Room';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent {
  validateForm! : UntypedFormGroup;

  @Input()
  floor:any

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
list:boolean=false
  handleBuildingCreation(room : Room)
  {
    room.floorId = this.floor.id
    this.restApi.addRoom(room).subscribe(
      data=>{
        console.log("Success", data)
       this.list = true
      },
      error=>{
        console.log("Failed", error)
        this.notification.error("Failed to create Room")
      }
    )
  }
}
