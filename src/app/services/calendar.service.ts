
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = 'https://www.googleapis.com/calendar/v3/calendars';

  constructor(private http: HttpClient) {}

  getCalendarEvents() {
    const url = `${this.baseUrl}/${encodeURIComponent(environment.calendarId)}/events`;
    const params = {
      key: environment.googleCalendarApiKey,
      timeMin: new Date().toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: environment.maxResults.toString()
    };

    return this.http.get<any>(url, { params });
  }
}
