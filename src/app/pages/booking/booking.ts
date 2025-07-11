import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDisplayComponent } from '../../components/calendar-display/calendar-display';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, CalendarDisplayComponent],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent implements OnInit {
  displayEvents: any[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.getCalendarEvents().subscribe((response: any) => {
      this.displayEvents = response.items.map((event: any) => {
            const isAvailable = event.transparency === 'transparent';
            return {
              title: isAvailable ? 'Available' : 'Booked',
              start: event.start.dateTime,
              end: event.end.dateTime,
              color: isAvailable ? '#28a745' : '#cccccc',
              textColor: isAvailable ? '#fff' : '#444',
              display: 'block',
              classNames: [isAvailable ? 'available-event' : 'booked-event']
            };
        });
      });
  }
}
