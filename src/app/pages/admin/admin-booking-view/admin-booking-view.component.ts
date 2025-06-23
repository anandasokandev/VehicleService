import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-admin-booking-view',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './admin-booking-view.component.html',
  styleUrl: './admin-booking-view.component.css'
})
export class AdminBookingViewComponent implements OnInit {

  serviceCenterId: number = Number(localStorage.getItem('userId'));
  bookings: any[] = [];
  @Input() bookingStatus = 'Success'
  constructor(private api: ApiService) { }

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
}
