import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '../../model/location';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-location',
  imports: [FormsModule, NgClass],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {

  locationObj: Location = new Location();
  locationService = inject(ApiService);

  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  addLocation(){ 
    this.locationService.addLocation({locationName: this.locationObj.locationName, pincode: this.locationObj.pincode}).subscribe((data: any)=>{
      console.log(data);
      debugger
      if(data.success == true)
      {
        alert("Location added successfully");
        window.location.reload();
      }else{
        alert(`${data.message}`);
        window.location.reload();
      }
    })
  }
  
}
