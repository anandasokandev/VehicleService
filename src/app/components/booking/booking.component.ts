import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [NgFor,NgClass,NgStyle,NgIf, DatePipe, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  vehicles: string[] = ['KL-07-AB-1234', 'KL-08-CD-5678'];
  serviceCenters: string[] = ['AutoFix Garage', 'TurboCare Workshop'];
  selectedVehicle = '';
  selectedCenter = '';
  selectedDate: Date | null = null;
  selectedTime = '';
  bookingConfirmed = false;

  // Calendar fields
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: (number | null)[] = [];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  availableTimes: string[] = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];


  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendarDays = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Fill empty slots before the first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      this.calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(day);
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  selectDate(day: number) {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.selectedTime = '';
    this.bookingConfirmed = false;
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.bookingConfirmed = false;
  }

  confirmBooking() {
    if (this.selectedVehicle && this.selectedCenter && this.selectedDate && this.selectedTime) {
      this.bookingConfirmed = true;
      // You could also trigger a service call here to save the booking to backend
    }
  }

  isToday(day: number | null): boolean {
    if (day === null) return false;
    const today = new Date();
    return day === today.getDate() &&
           this.currentMonth === today.getMonth() &&
           this.currentYear === today.getFullYear();
  }

  isSelected(day: number | null): boolean {
    if (!this.selectedDate || day === null) return false;
    return day === this.selectedDate.getDate() &&
           this.currentMonth === this.selectedDate.getMonth() &&
           this.currentYear === this.selectedDate.getFullYear();
  }

  isBooked(day: number | null): boolean {
    // Placeholder for actual booking logic
    return false;
  }

  getAriaLabel(day: number): string {
    return new Date(this.currentYear, this.currentMonth, day).toDateString();
  }

}
