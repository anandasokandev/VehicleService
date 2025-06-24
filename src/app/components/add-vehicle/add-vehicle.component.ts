import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {

  vehicleForm: FormGroup;
  serviceCategory: any;
  userId: number | null = null;
  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) {
    this.vehicleForm = this.fb.group({
      registrationNumber: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      serviceCategoryId: ['', Validators.required]
    });

    const storedId = localStorage.getItem('userId');
    this.userId = storedId ? parseInt(storedId, 10) : 0;
  }

  ngOnInit() {
    this.api.fetchServiceCategory().subscribe((data: any) => {
      this.serviceCategory = data;
    })
  }

  onSubmit() {
    const payload = {
      ...this.vehicleForm.value,
      userId: this.userId
    };
    console.log(payload);
    if(payload)
    {
      this.api.addVehicle(payload).subscribe((data: any)=>{
        if(data.length > 0)
        {
          alert('Vehicle added successfully');
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }


}
