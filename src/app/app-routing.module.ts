import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' }, 
  { path: 'events', component: EventListComponent },
  { path: 'events/new', component: EventEditComponent },
  { path: 'events/:_id', component: EventDetailComponent }, 
  { path: 'events/:_id/edit', component: EventEditComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
