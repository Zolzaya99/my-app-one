import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { Observable, Subscription } from 'rxjs'; 

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events$: Observable<Event[]>; 
  private subscription: Subscription;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents(); 

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Event } from '../event.model';
// import { Observable, of } from 'rxjs'; 
// import { MOCKEVENTS } from '../MOCKEVENTS';

// @Component({
//   selector: 'app-event-list',
//   templateUrl: './event-list.component.html',
//   styleUrls: ['./event-list.component.css']
// })
// export class EventListComponent implements OnInit {
//   events$: Observable<Event[]>;

//   constructor() {}

//   ngOnInit(): void {
//     this.events$ = of(MOCKEVENTS);
//   }
// }