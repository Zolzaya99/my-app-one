import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  // event: Event = new Event(); 
  originalEvent: Event;
  event: Event;
  editMode: boolean = false;
  id: string;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = params['_id']; 
      if (eventId) {
        this.editMode = true;
        this.eventService.getEvent(eventId).subscribe(
          event => {
            this.event = event;
            this.event.id = eventId;
            this.originalEvent = { ...event };
          },
          error => console.error('Error fetching event:', error)
        );
      } else {
        this.editMode = false;
        this.event = new Event();
      }
    });
  }
  
  saveEvent(): void {
    if (this.editMode) {
      this.eventService.updateEvent(this.event).subscribe(() => {
        this.successMessage = 'Event updated successfully.';
        this.router.navigate(['/events']); 
      }, error => {
        this.errorMessage = 'Error updating event. Please try again later.';
      });
    } else {
      this.eventService.addEvent(this.event).subscribe(() => {
        this.successMessage = 'Event created successfully.';
        this.router.navigate(['/events']); 
      }, error => {
        this.errorMessage = 'Error creating event. Please try again later.';
      });
    }
  }
  

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
