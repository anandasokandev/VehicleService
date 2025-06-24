import { Component, inject } from '@angular/core';
import { SignupPageComponent } from "../../pages/signup-page/signup-page.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-signup',
  imports: [SignupPageComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  role: string = 'User'

  setRole = (role: string) => {
    this.role = role;
  }
  
}
