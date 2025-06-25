import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-booking-view',
  standalone: true,
  imports: [NgClass, DatePipe, CommonModule],
  templateUrl: './admin-booking-view.component.html',
  styleUrl: './admin-booking-view.component.css'
})
export class AdminBookingViewComponent implements OnInit {

  serviceCenterId: number = Number(localStorage.getItem('userId'));
  bookings: any[] = [];
  @Input() bookingStatus = 'Success'
  currentUrl: string = '';
  constructor(private api: ApiService, private router: Router) 
  {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    });
  }

  ngOnInit() {
    this.fetchBookingByServiceCenter();

    
  }

  fetchBookingByServiceCenter() {
    this.api.fetchServiceCenterByServiceCenter(this.serviceCenterId).subscribe(
      (data: any[]) => {
        this.bookings = data;
        console.log('Bookings fetched:', data);
      },
      error => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  cancel(vehicle: any){
    this.api.changeBookingStatus(vehicle.bookingId, 'Cancelled').subscribe((data: any)=>{
      if(data.success)
      {
        alert('Booking cancelled successfully');
        window.location.reload();
      }
    })
  }

  complete(vehicle: any){
    this.api.changeBookingStatus(vehicle.bookingId, 'Completed').subscribe((data: any)=>{
      if(data.success)
      {
        alert('Service Completed successfully');
        window.location.reload();
      }
    })
  }
}
