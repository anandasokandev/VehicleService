import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [NgIf, NgFor, FormsModule, NgStyle, NgClass, DatePipe],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  vehicles = ['KL-07-AB-1234', 'KL-08-CD-5678'];
  serviceCenters = ['AutoFix Garage', 'TurboCare Workshop'];
  selectedVehicle = '';
  selectedCenter = '';
  selectedDate: Date | null = null;
  selectedTime = '';
  bookingConfirmed = false;

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  calendarDays: (number | null)[] = [];

  availableTimes = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'
  ];

  completedDates: Date[] = [
    new Date(2025, 5, 29), // June 29, 2025
    new Date(2025, 6, 3),
    new Date(2025,5,25)   // July 3, 2025
  ];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) this.calendarDays.push(null);
    for (let d = 1; d <= totalDays; d++) this.calendarDays.push(d);
  }

  prevMonth() {
    this.currentMonth === 0 ? (this.currentMonth = 11, this.currentYear--) : this.currentMonth--;
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth === 11 ? (this.currentMonth = 0, this.currentYear++) : this.currentMonth++;
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
    }
  }

  isToday(day: number | null): boolean {
    if (day === null) return false;
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === this.currentMonth &&
           today.getFullYear() === this.currentYear;
  }

  isSelected(day: number | null): boolean {
    if (!this.selectedDate || day === null) return false;
    return day === this.selectedDate.getDate() &&
           this.currentMonth === this.selectedDate.getMonth() &&
           this.currentYear === this.selectedDate.getFullYear();
  }

  isCompleted(day: number | null): boolean {
    if (day === null) return false;
    const date = new Date(this.currentYear, this.currentMonth, day);
    return this.completedDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
  }

  getAriaLabel(day: number): string {
    return new Date(this.currentYear, this.currentMonth, day).toDateString();
  }
}
