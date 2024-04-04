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
  isNewEvent: boolean = true;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isNewEvent = false;
        const eventId = params['id'];
        this.eventService.getEvent(eventId).subscribe(event => {
          this.event = event;
        });
      } else {
        this.isNewEvent = true;
      }
    });
  }

  saveEvent(): void {
    if (this.isNewEvent) {
      this.eventService.addEvent(this.event).subscribe(() => {
        this.router.navigate(['/events']); 
      });
    } else {
      this.eventService.updateEvent(this.event).subscribe(() => {
        this.router.navigate(['/events']); 
      });
    }
  }
}
