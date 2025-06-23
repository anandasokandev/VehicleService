import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-vehicle-list',
  imports: [NgIf, NgFor],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent {

  vehicleService = inject(ApiService);
  vehicles: any[] = [];

  @Input() vehicleSearch : any ;

 ngOnChanges() {
  console.log(this.vehicleSearch);

  if (this.vehicleSearch.registrationNumber) {
    this.vehicleService.fetchVehicleByRegistration(this.vehicleSearch.registrationNumber).subscribe((data: any) => {
      console.log(data);
      this.vehicles = data;
    });
  } else if (this.vehicleSearch.ownerName) {
    this.vehicleService.fetchVehicle().subscribe((res: any[]) => {
      const searchValue = this.vehicleSearch.ownerName.trim().toLowerCase();
      this.vehicles = res.filter(v => 
        v.ownerName && v.ownerName.toLowerCase().includes(searchValue)
      );
    });
  } else {
    this.vehicles = [];
  }
}

}
