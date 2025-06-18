import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-upcomming-booking',
  imports: [NgClass, RouterLink],
  templateUrl: './upcomming-booking.component.html',
  styleUrl: './upcomming-booking.component.css'
})
export class UpcommingBookingComponent {

  @Input() bookingStatus = 'Current';

}
