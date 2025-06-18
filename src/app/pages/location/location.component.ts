import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-location',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {

  locationForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.locationForm = this.fb.group({
      LocationName: ['', [Validators.required]],
      Pincode: ['',[Validators.required]]
    })
  }

  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  addLocation(){
    if(this.locationForm.valid){
      console.log(this.locationForm.value);
    }
  }
}
