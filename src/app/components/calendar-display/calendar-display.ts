import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-calendar-display',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './calendar-display.html',
  styleUrls: ['./calendar-display.css']
})
export class CalendarDisplayComponent implements OnChanges {
  calendarOptions: CalendarOptions;
  selectedSlot: {start: Date, end: Date} | null = null;
  message = '';
  @Input() events: any[] = [];

  constructor() {
    this.calendarOptions = {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      slotMinTime: environment.slotMinTime,
      slotMaxTime: environment.slotMaxTime,
      allDaySlot: false,
      editable: false,
      events: this.events,
      height: 'auto', // or a number like 600 for fixed height
      contentHeight: 'auto', // for better control
      eventClick: this.handleEventClick.bind(this),
    };
  }

  ngOnChanges(changes: SimpleChanges) {
  if (changes['events'] && this.calendarOptions) {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
  }
}
handleEventClick(info: EventClickArg) {
  const event = info.event;
  if (event.classNames.includes('available-event')) {
    const start = event.start!;
    const end = event.end!;

    // Format time range (e.g., "July 20, 2–3PM")
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

    const slotText = `${startStr}–${endStr}`; // e.g., "July 20, 2:00 PM–3:00 PM"
    const encodedSlot = encodeURIComponent(slotText);

    const formUrl = `${environment.formLink}${encodedSlot}`;

    window.open(formUrl, '_blank');
  }
}

}
