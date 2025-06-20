import { Component } from '@angular/core';
import { UpcommingBookingComponent } from "../../pages/upcomming-booking/upcomming-booking.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-booking-history',
  imports: [UpcommingBookingComponent],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent {

  status: string = 'Success';
  role: string | null = null;

  constructor(){
    this.role = localStorage.getItem('role');
  }

  bookingStatus(status: string) {
    this.status = status;
  }
}
