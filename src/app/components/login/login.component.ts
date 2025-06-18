import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(5)]] 
    });
  }
  
  login() {
    event?.preventDefault();
    console.log(this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
      }, (error: Error) => {
        console.log('Login Failed', error);
      })
    }
  }

}
