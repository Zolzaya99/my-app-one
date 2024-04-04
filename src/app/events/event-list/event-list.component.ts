import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { Observable, of } from 'rxjs'; 
import { MOCKEVENTS } from '../MOCKEVENTS';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events$: Observable<Event[]>;

  constructor() {}

  ngOnInit(): void {
    this.events$ = of(MOCKEVENTS);
  }
}

