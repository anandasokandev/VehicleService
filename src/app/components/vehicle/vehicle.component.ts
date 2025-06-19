import { Component, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-vehicle',
  imports: [],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

  apiService = inject(ApiService);
  userId: number = 0;
  vehicleDetails: any[] = [];

  constructor() {
    const storedId = localStorage.getItem('userId');
    this.userId = storedId ? parseInt(storedId, 10) : 0;
  }

  ngOnInit() {
    this.apiService.fetchVehicleByUser(this.userId).subscribe((res: any)=>{
      console.log(res);
      this.vehicleDetails = res;
    })
  }
}
