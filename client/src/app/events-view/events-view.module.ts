import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsViewRoutingModule } from './events-view-routing.module';
import { EventsViewComponent } from './events-view.component';
import { HttpClient } from '@angular/common/http';
import { TimelineComponent } from './components/timeline/timeline.component';
import { EventComponent } from './components/event/event.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchPageComponent } from './pages/match-page/match-page.component';
 


@NgModule({
  declarations: [EventsViewComponent, TimelineComponent, EventComponent, MatchPageComponent],
  imports: [
    CommonModule,
    EventsViewRoutingModule,
    NgbModule,
  ],
  providers: [HttpClient]
})
export class EventsViewModule { }
