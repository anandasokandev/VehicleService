import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, NgStyle, DatePipe, NgIf, NgFor, NgClass],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  currentYear: number = 0;
  currentMonth: number = 0;
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
  vehicles: string[] = ['KL-07-BQ-1234 - Activa 6G', 'KL-38-AZ-4567 - Swift Dzire'];
  serviceCenters: string[] = ['AutoFix Garage, Thodupuzha', 'SpeedLine Workshop, Muvattupuzha'];
  selectedVehicle: string = '';
  selectedCenter: string = '';

  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.bookedDates = [];
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const firstDayWeekday = firstDay.getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayWeekday; i++) this.calendarDays.push(null);
    for (let day = 1; day <= daysInMonth; day++) this.calendarDays.push(day);
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.bookingConfirmed = false;
  }

  prevMonth(): void {
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    if (this.currentMonth === 11) this.currentYear--;
    this.resetSelection();
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    if (this.currentMonth === 0) this.currentYear++;
    this.resetSelection();
    this.generateCalendar();
  }

  selectDate(day: number): void {
    const date = new Date(this.currentYear, this.currentMonth, day);
    if (this.isBooked(date)) return;
    this.selectedDate = date;
    this.bookingConfirmed = false;
  }

  confirmBooking(): void {
    if (this.selectedDate && !this.isBooked(this.selectedDate)) {
      const iso = this.selectedDate.toISOString().split('T')[0];
      this.bookedDates.push(iso);
      this.bookingConfirmed = true;
    }
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear();
  }

  isSelected(day: number | null): boolean {
    if (!day || !this.selectedDate) return false;
    return day === this.selectedDate.getDate() &&
      this.currentMonth === this.selectedDate.getMonth() &&
      this.currentYear === this.selectedDate.getFullYear();
  }

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
}