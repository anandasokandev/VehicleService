import { Component } from '@angular/core';
import { UpcommingBookingComponent } from "../../pages/upcomming-booking/upcomming-booking.component";

@Component({
  selector: 'app-booking-history',
  imports: [UpcommingBookingComponent],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent {

  status: string = 'Current'

  bookingStatus(status: string) {
    this.status = status;
  }
}
