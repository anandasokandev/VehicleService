import { Component, inject } from '@angular/core';
import { ServiceCenterInputComponent } from "../../pages/service-center-input/service-center-input.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-service-center',
  imports: [ServiceCenterInputComponent],
  templateUrl: './service-center.component.html',
  styleUrl: './service-center.component.css'
})
export class ServiceCenterComponent {

  searchType: string = 'Pincode'

  locationService = inject(ApiService);


  findServiceCenter(ServiceCenter: string){
    this.searchType = ServiceCenter;
  }
 
}
