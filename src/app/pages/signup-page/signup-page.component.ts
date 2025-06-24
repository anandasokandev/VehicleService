import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { SignUp } from '../../model/signup';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  imports: [LocationComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {


  form: FormGroup;
  @Input() role: string = '';
  serviceCategory: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['role']) {
      this.userRole = changes['role'].currentValue
      this.form.get('role')?.setValue(this.userRole || '');
    }
  }

  userRole: string = ''
  showModal = false;
  location: any = ''
  apiService = inject(ApiService);
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      locationId: ['', Validators.required],
      centerName: ['', Validators.required],
      addressLane1: [''],
      addressLane2: [''],
      serviceCategoryId: ['']
    });

  }

  ngOnInit() {
    this.apiService.fetchLocation().subscribe((res: any) => {
      this.location = res.location;
      console.log(this.location);
    })
    this.form.get('role')?.setValue(this.userRole || '');
    console.log(this.role);

    this.apiService.fetchServiceCategory().subscribe((data: any)=>{
      this.serviceCategory = data;
    })
  }

  submit() {
    console.log(this.form.value);
    if (this.role == 'User') {
      this.apiService.addUser(this.form.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.success == true) {
            alert(`${res.message}`)
            this.router.navigate(['/login'])
          } else {
            alert(`${res.message}`)
            this.router.navigate(['/login'])
          }
        }, error: (error) => {
          console.error('API Error:', error);
          alert('Something went wrong. Please try again.');
        }
      })
    }else{
       this.apiService.addServiceCenter(this.form.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.success == true) {
            alert(`${res.message}`)
          } else {
            alert(`${res.message}`)
          }
        }, error: (error) => {
          console.error('API Error:', error);
          alert('Something went wrong. Please try again.');
        }
      })
    }

  }

  openModal() {
    this.showModal = true;
  }

  handleCloseModal() {
    this.showModal = false;
  }
}
