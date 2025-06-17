import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpcommingBookingComponent } from "../../pages/upcomming-booking/upcomming-booking.component";

@Component({
  selector: 'app-home',
  imports: [UpcommingBookingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor(private router: Router){
    console.log(this.router.url);
  }
}
