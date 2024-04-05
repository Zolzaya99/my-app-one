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
  event: Event = new Event();
  editMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        const eventId = params['id'];
        this.eventService.getEvent(eventId).subscribe(event => {
          this.event = event;
        });
      } else {
        this.editMode = false;
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
    this.router.navigate(['/events']);
  }
}
