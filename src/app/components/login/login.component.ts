import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {

    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  login() {
    event?.preventDefault();
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe((res: any) => {
        if (res.success === true) {
          console.log(res);
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem("userId", res.user);
          localStorage.setItem('role', res.role);
          this.router.navigate(['/dashboard']);
        }
      }, (error: Error) => {
        console.log('Login Failed', error);
      })
    } else {
      console.log('All fields are required');
    }
  }

}
