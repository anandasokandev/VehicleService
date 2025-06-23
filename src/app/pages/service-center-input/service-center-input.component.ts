import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-center-input',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './service-center-input.component.html',
  styleUrl: './service-center-input.component.css'
})
export class ServiceCenterInputComponent {

  locationService = inject(ApiService);
  @Input() searchType: string = 'Location';

  location: any[] = [];
  serviceCenters: any[] = [];
  selected: any = ''

  ngOnInit() {
    this.findLocation();
  }

  findLocation() {
    this.locationService.fetchLocation().subscribe((data: any) => {
      this.location = Array.isArray(data.location) ? data.location : [];
      console.log('Locations:', this.location);
    });
  }

  findServiceCenter(locationIdOrType: string) {
    console.log('Selected:', locationIdOrType);
    if( locationIdOrType == 'Two Wheeler' || locationIdOrType == 'Four Wheeler')
    {
      this.locationService.fetchServiceCenterByCategoryId(locationIdOrType == "Two Wheeler" ? 2: 1).subscribe((res: any)=>{
        if(res.length > 0)
        {
          this.serviceCenters = res;
          console.log(this.serviceCenters);
        }else{
          alert("No service centers available");
          this.serviceCenters = []
        }
      })
    }else{
      this.locationService.fetchServiceCenterByLocation(locationIdOrType).subscribe((res: any)=>{
        console.log(res);
        if(res.length > 0)
        {
          this.serviceCenters = res;
          console.log(this.serviceCenters);
        }else{
          alert("No service centers available");
          this.serviceCenters = []
        }
      })
    }
  }
}
