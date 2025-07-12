import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CalendarService } from '../../services/calendar.service';
import { CalendarEvent } from '../../models/calendar-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  clientTitle = environment.clientTitle;
  clientEmail = environment.clientEmail;
  clientPhone = environment.clientPhone;
  nextAvailable: CalendarEvent | null = null;

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.fetchCalendarEvents().subscribe(() => {
      const events = this.calendarService.getStoredEvents();
      if (events) {
        this.nextAvailable = events.find(e => e.title === 'Available') || null;
      }
    });
  }
  goToForm() {
    if (!this.nextAvailable) return;

    const start = new Date(this.nextAvailable.start);
    const end = new Date(this.nextAvailable.end);

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Chicago'
    };

    const startStr = new Intl.DateTimeFormat('en-US', options).format(start);
    const endStr = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Chicago'
    }).format(end);

    const slotText = `${startStr}–${endStr}`;
    const encodedSlot = encodeURIComponent(slotText);

    const formUrl = `${environment.formLink}${encodedSlot}`;
    window.open(formUrl, '_blank');
  }
}
