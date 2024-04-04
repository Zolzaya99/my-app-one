import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { Params } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const eventId = params['id'];
      this.eventService.getEvent(eventId).subscribe(
        event => this.event = event,
        error => console.error('Error fetching event:', error)
      );
    });
  }
  
  updateEvent(): void {
    // Navigate to the event edit page
    if (this.event) {
      this.router.navigate(['/events', this.event.id, 'edit']);
    } else {
      console.error('Event not loaded.');
    }
  }

  deleteEvent(): void {
    // Use the event service to delete the event
    if (this.event) {
      this.eventService.deleteEvent(this.event)
        .subscribe(
          () => {
            // Navigate back to the event list after deletion
            this.router.navigate(['/events']);
          },
          error => console.error('Error deleting event:', error)
        );
    } else {
      console.error('Event not loaded.');
    }
  }
  onDelete() {
    this.eventService.deleteEvent(this.event);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
