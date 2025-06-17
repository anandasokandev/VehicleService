import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';

@Component({
  selector: 'app-booking',
  imports: [NgIf, NgStyle, NgFor],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  currentYear: number = 0;
  currentMonth: number = 0;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  calendarDays: (number | null)[] = [];
  selectedDate: Date | null = null;
  bookingConfirmed = false;
  // Example booked dates: 5th, 10th, and 15th of current month
  bookedDates: number[] = [];
  ngOnInit(): void {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.bookedDates = [5, 10, 15];
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const firstDayWeekday = firstDay.getDay(); // 0=Sun ... 6=Sat
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    // Fill null for the previous month's days on grid start
    for (let i = 0; i < firstDayWeekday; i++) {
      this.calendarDays.push(null);
    }
    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(day);
    }
    // Optional: fill trailing nulls to fix grid, not mandatory
  }
  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.resetSelection();
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.resetSelection();
    this.generateCalendar();
  }
  selectDate(day: number): void {
    if (this.isBooked(day)) {
      return;
    }
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.bookingConfirmed = false;
  }

  confirmBooking(): void {
    if (this.selectedDate && !this.isBooked(this.selectedDate.getDate())) {
      // Simulate booking by adding to bookedDates
      this.bookedDates.push(this.selectedDate.getDate());
      this.bookingConfirmed = true;
    }
  }
  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  isSelected(day: number | null): boolean {
    if (!day || !this.selectedDate) return false;
    return (
      day === this.selectedDate.getDate() &&
      this.currentMonth === this.selectedDate.getMonth() &&
      this.currentYear === this.selectedDate.getFullYear()
    );
  }
  isBooked(day: number | null): boolean {
    if (!day) return false;
    return this.bookedDates.includes(day);
  }
  getAriaLabel(day: number): string {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formatted = date.toLocaleDateString(undefined, options);
    if (this.isBooked(day)) {
      return `${formatted} - Booked, unavailable`;
    }
    return formatted;
  }
  private resetSelection(): void {
    this.selectedDate = null;
    this.bookingConfirmed = false;
  }
}
