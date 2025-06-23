import { Component } from '@angular/core';
import { AdminBookingViewComponent } from "../admin-booking-view/admin-booking-view.component";

@Component({
  selector: 'app-admin-booking',
  imports: [AdminBookingViewComponent],
  templateUrl: './admin-booking.component.html',
  styleUrl: './admin-booking.component.css'
})
export class AdminBookingComponent {
  bookingStatus(status: string) {
    this.status = status;
  }
  status: string = 'Success';

}
