import { Component } from '@angular/core';
import { ServiceCenterInputComponent } from "../../pages/service-center-input/service-center-input.component";

@Component({
  selector: 'app-service-center',
  imports: [ServiceCenterInputComponent],
  templateUrl: './service-center.component.html',
  styleUrl: './service-center.component.css'
})
export class ServiceCenterComponent {

  searchType: string = 'Pincode'

  findServiceCenter(searchType: string){
    this.searchType = searchType;
  }
}
