import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDisplayComponent } from '../../components/calendar-display/calendar-display';
import { CalendarService } from '../../services/calendar.service';
import { CalendarEvent } from '../../models/calendar-event';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, CalendarDisplayComponent],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent implements OnInit {
  displayEvents: CalendarEvent[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.getData();
  }

  refresh() {
    this.getData();
  }

  getData() {
    this.calendarService.fetchCalendarEvents().subscribe(() => {
      const events = this.calendarService.getStoredEvents();
      if (events) {
        this.displayEvents = events;
      }
    });
  }
}
