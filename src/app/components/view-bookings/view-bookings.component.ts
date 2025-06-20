import { Component } from '@angular/core';
import { BookingComponent } from "../booking/booking.component";
import { BookingHistoryComponent } from "../booking-history/booking-history.component";

@Component({
  selector: 'app-view-bookings',
  imports: [BookingComponent, BookingHistoryComponent],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent {

}
