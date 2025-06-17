import { Component, Input } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  imports: [LocationComponent, NgIf],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {

  @Input() role = ''
  
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  handleCloseModal() {
    this.showModal = false;
  }
}
