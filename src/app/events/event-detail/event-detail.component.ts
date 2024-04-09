import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  editMode: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route params:', params); 
      const eventId = params['_id']; 
      if (eventId) {
        this.eventService.getEvent(eventId).subscribe(
          event => this.event = event,
          error => console.error('Error fetching event:', error)
        );
      } else {
        console.error('Event ID is missing.');
      }
    });
  }
  
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
  
  updateEvent(): void {
    if (this.event) {
      this.router.navigate(['/events', this.event.id, 'edit']); 
    } else {
      console.error('Event not loaded.');
    }
  }

 
deleteEvent(): void {
  if (this.event && this.event.id) {
    this.eventService.deleteEvent(this.event.id).subscribe(
      () => {
        this.router.navigate(['/events']);
      },
      error => {
        console.error('Error deleting event:', error);
      }
    );
  } else {
    console.error('Event or event ID not loaded.');
  }
}
}
  

