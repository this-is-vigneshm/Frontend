import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  a:any

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      locationName: [
        null,
        [
          Validators.required,
        ],
      ],description: [
        null,
        [
          Validators.required,
        ],
      ],


      addressLine1: [
        null,
        [
          Validators.required,
          // Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
        ],
      ],
      addressLine2: [
        null,
        [
          Validators.required,
        ],
      ],
      addressLine3: [
        null,
        [
          Validators.required,
        ],
      ],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      country: [null, [Validators.required]],

    });

  }
  constructor(
    private fb: UntypedFormBuilder
  ) {}
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submitted', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


}
