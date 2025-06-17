import { Component } from '@angular/core';
import { LocationComponent } from "../location/location.component";

@Component({
  selector: 'app-signup-page',
  imports: [LocationComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
showModal = false;

  openModal() {
    this.showModal = true;
  }

  handleCloseModal() {
    this.showModal = false;
  }
}
