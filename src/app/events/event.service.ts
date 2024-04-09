import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from './event.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EventDetailComponent } from './event-detail/event-detail.component';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsUrl = 'http://localhost:3000/api/events';
  private eventSelectedSubject: Subject<Event> = new Subject<Event>();
  eventSelected$: Observable<Event> = this.eventSelectedSubject.asObservable();
  private events: Event[] = [];
  private event: Event;
  private maxEventId: number = 0;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl)
      .pipe(
        catchError(this.handleError) 
      );
  }

  getEvent(id: string): Observable<Event> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get<Event>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addEvent(newEvent: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, newEvent, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(eventId: string): Observable<void> {
    const url = `${this.eventsUrl}/${eventId}`;
    return this.http.delete<void>(url);
  }

  updateEvent(event: Event): Observable<Event> {
    const updateUrl = `${this.eventsUrl}/${event.id}`;
    return this.http.put<Event>(updateUrl, event, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
