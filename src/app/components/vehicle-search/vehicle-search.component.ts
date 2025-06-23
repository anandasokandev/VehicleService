import { Component } from '@angular/core';
import { VehicleComponent } from "../vehicle/vehicle.component";
import { VehicleListComponent } from "../../pages/vehicle-list/vehicle-list.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-search',
  imports: [VehicleListComponent, FormsModule],
  templateUrl: './vehicle-search.component.html',
  styleUrl: './vehicle-search.component.css'
})
export class VehicleSearchComponent {

   searchCriteria = {
    registrationNumber: '',
    ownerName: ''
  };

  search(searchCriteria: any){
    this.searchCriteria = { ...searchCriteria };
  }

}
