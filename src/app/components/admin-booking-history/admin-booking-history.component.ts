import { Component } from '@angular/core';
import { AdminBookingViewComponent } from "../../pages/admin/admin-booking-view/admin-booking-view.component";

@Component({
  selector: 'app-admin-booking-history',
  imports: [AdminBookingViewComponent],
  templateUrl: './admin-booking-history.component.html',
  styleUrl: './admin-booking-history.component.css'
})
export class AdminBookingHistoryComponent {
  status: string = 'Success';
  role: string | null = null;

  constructor(){
    this.role = localStorage.getItem('role');
  }

  bookingStatus(status: string) {
    this.status = status;
  }
}
