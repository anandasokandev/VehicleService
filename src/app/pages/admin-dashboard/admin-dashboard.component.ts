import { Component } from '@angular/core';
import { AdminBookingViewComponent } from '../admin/admin-booking-view/admin-booking-view.component';


@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminBookingViewComponent ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
