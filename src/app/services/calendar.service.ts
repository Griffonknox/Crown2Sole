import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = 'https://www.googleapis.com/calendar/v3/calendars';
  private eventsSubject = new BehaviorSubject<CalendarEvent[] | null>(null);
  public events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchCalendarEvents(): Observable<any> {
    const url = `${this.baseUrl}/${encodeURIComponent(environment.calendarId)}/events`;
    const params = {
      key: environment.googleCalendarApiKey,
      timeMin: new Date().toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: environment.maxResults.toString()
    };

    return this.http.get<any>(url, { params }).pipe(
      tap((res) => {
        const transformed: CalendarEvent[] = res.items.map((event: any) => {
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
        this.eventsSubject.next(transformed);
      })
    );
  }

  getStoredEvents(): CalendarEvent[] | null {
    return this.eventsSubject.value;
  }
}
