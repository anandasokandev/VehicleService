import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-upcomming-booking',
  imports: [NgClass, RouterLink, DatePipe],
  templateUrl: './upcomming-booking.component.html',
  styleUrl: './upcomming-booking.component.css'
})
export class UpcommingBookingComponent {

  @Input() bookingStatus = 'Success';
  userId: number;
  role: string | null = null;
  bookingDetails : any[] = [];
  Array = Array;

  constructor(private router: Router, private api: ApiService) {
    const storedId = localStorage.getItem('userId');
    this.userId = storedId ? parseInt(storedId, 10) : 0;
    console.log(this.userId);
    
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    if(this.role == 'User'){
      this.fetchUserBooking();
    }else{

    }
  }



  fetchUserBooking() {
  this.api.fetchUserBooking(this.userId).subscribe({
    next: (res) => {
      this.bookingDetails = res;
      console.log(this.bookingDetails);
    },
    error: (err) => {
      console.error('Error fetching booking:', err);
    }
  });


}

}
