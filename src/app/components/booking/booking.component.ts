import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, NgStyle, DatePipe, NgIf, NgFor, NgClass],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  userId: number = 0
  role: string | null = ''
  currentYear: number = 0;
  currentMonth: number = 0;
  today: Date = new Date();
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  availableTimes = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'
  ];
  calendarDays: (number | null)[] = [];
  selectedDate: Date | null = null;
  bookingConfirmed = false;
  bookedDates: string[] = [];
  selectedTime = '';
  selectedCenterId: number | null = null;
  vehicles: any[] = [];
  selectedVehicle: [] = [];   // Selected Vehicle
  selectedCenter: any[] = [];
  serviceVehicle: any = null
  constructor(private api: ApiService, private router: Router) {
    const storedId = localStorage.getItem('userId');
    this.userId = storedId ? parseInt(storedId, 10) : 0;
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.bookedDates = [];
    this.generateCalendar();
    this.fetchVehicles();
    this.fetchBookingByUser(this.userId);

    this.api.fetchVehicleByUser(this.userId).subscribe((data: any)=>{
      console.log(data);
      if(data.length == 0 && this.role == 'User' )
      {
        alert('Add Vehicle to continue booking');
        this.router.navigate(['/add-vehicle'])
      }
    })
  }

  // Generate Calender 
  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const firstDayWeekday = firstDay.getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayWeekday; i++) this.calendarDays.push(null);
    for (let day = 1; day <= daysInMonth; day++) this.calendarDays.push(day);
  }

  // to get previous month
  prevMonth(): void {
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    if (this.currentMonth === 11) this.currentYear--;
    this.resetSelection();
    this.generateCalendar();
  }

  // to get next month
  nextMonth(): void {
    this.currentMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    if (this.currentMonth === 0) this.currentYear++;
    this.resetSelection();
    this.generateCalendar();
  }

  // to select date for booking
  selectDate(day: number): void {
    const date = new Date(this.currentYear, this.currentMonth, day);
    if (this.isBooked(date)) return;
    this.selectedDate = date;
    this.bookingConfirmed = false;
  }

  // Select booking time
  selectTime(time: string) {
    this.selectedTime = time;
    this.bookingConfirmed = false;
  }

  isPastOrToday(day: number): boolean {
    const today = new Date();
    const calendarDate = new Date(this.currentYear, this.currentMonth, day);

    // Disable if the date is today or earlier
    return calendarDate <= today;
  }

  // confirm booking
  confirmBooking(): void {
    if (this.selectedDate && !this.isBooked(this.selectedDate) && this.selectedTime) {
      const [time, modifier] = this.selectedTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      const bookingDateTime = new Date(this.selectedDate);
      bookingDateTime.setHours(hours, minutes, 0, 0);

      const formattedDateTime = this.formatDateTime(bookingDateTime);
      console.log(formattedDateTime);

      const bookingPayload = {
        serviceCenterId: this.selectedCenterId,
        startTime: formattedDateTime,
        vehicleId: this.serviceVehicle.vehicleId
      };

      // this.api.bookService(bookingPayload).subscribe({
      //   next: res => {
      //     this.bookingConfirmed = true;
      //     this.bookedDates.push(this.selectedDate!.toISOString().split('T')[0]);
      //     console.log('✅ Booking success:', res);
      //   },
      //   error: err => {
      //     console.error('❌ Booking failed:', err?.error?.errors || err.message);
      //   }
      // });

      this.api.bookService(bookingPayload).subscribe((data: any) => {
        console.log(data);
        debugger
        if(data.success != false){
          alert(`Booking ${data.message}`);
        }else{
          alert(`${data.message}`);
        }
      })

    }
  }

  formatDateTime = (dt: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T` +
      `${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
  };



  // to check current day
  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear();
  }

  // If the day is selected or not
  isSelected(day: number | null): boolean {
    if (!day || !this.selectedDate) return false;
    return day === this.selectedDate.getDate() &&
      this.currentMonth === this.selectedDate.getMonth() &&
      this.currentYear === this.selectedDate.getFullYear();
  }

  // To check where there is any booking exists for the day
  isBooked(day: number | Date | null): boolean {
    if (!day) return false;
    let date: Date;
    if (typeof day === 'number') {
      date = new Date(this.currentYear, this.currentMonth, day);
    } else {
      date = day;
    }
    const iso = date.toISOString().split('T')[0];
    return this.bookedDates.includes(iso);
  }

  getAriaLabel(day: number): string {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = date.toLocaleDateString(undefined, options);
    return this.isBooked(day) ? `${formatted} - Booked, unavailable` : formatted;
  }

  private resetSelection(): void {
    this.selectedDate = null;
    this.bookingConfirmed = false;
  }

  // to fetch user vehicles
  fetchVehicles() {
    this.api.fetchVehicleByUser(this.userId).subscribe((res: any) => {
      this.vehicles = res;
      console.log(res);

    })
  }

  // fetch service center based on user vehicle type
  fetchSeviceCenter(serviceCategoryId: number) {
    this.api.fetchServiceCenterByCategoryId(serviceCategoryId).subscribe((res: any) => {
      this.selectedCenter = res;
      console.log(res);
    })
  }

  // After vehicle is selected
  onVehicleSelected(Id: number): void {

    const vehicle = this.vehicles.find(v => v.vehicleId == Id);

    if (vehicle) {
      this.serviceVehicle = vehicle;
      console.log('Selected vehicle:', this.serviceVehicle);
      this.fetchSeviceCenter(vehicle.serviceCategoryId);
    } else {
      console.warn('Vehicle not found for ID:', Id);
    }
  }


  //select service center
  selectServiceCenter(serviceCenterId: number) {
    this.selectedCenterId = serviceCenterId;
    this.selectedCenter = this.selectedCenter.filter(sc => sc.serviceCenterId === serviceCenterId);
    console.log(this.selectedCenter);
  }

  fetchBookingByUser(userId: any) {
    this.api.fetchUserBooking(userId).subscribe((data: any[]) => {
      const filteredBookings = data.filter(b =>
        b.bookingStatus === 'Success' || b.bookingStatus === 'Rescheduled'
      );
      this.bookedDates.push(...filteredBookings.map(b => b.startTime))
    })
  }

}