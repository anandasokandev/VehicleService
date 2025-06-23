import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpcommingBookingComponent } from "../../pages/upcomming-booking/upcomming-booking.component";
import { VehicleComponent } from "../vehicle/vehicle.component";
import { ServiceCenterComponent } from "../service-center/service-center.component";
import { AdminDashboardComponent } from '../../pages/admin/admin-booking-view/admin-dashboard/admin-dashboard.component';


@Component({
  selector: 'app-home',
  imports: [UpcommingBookingComponent, VehicleComponent, ServiceCenterComponent ,AdminDashboardComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  role: string | null = null;

  constructor() {
    this.role = localStorage.getItem('role');
    console.log(this.role);
  }


}
