import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsViewComponent } from './events-view.component';
import { MatchPageComponent } from './pages/match-page/match-page.component';
import { MatchIdResolver } from './resolvers/match-id.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: EventsViewComponent
  },
  { 
    path: ':id', 
    component: MatchPageComponent,
    resolve: {
      matchId: MatchIdResolver
    }
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsViewRoutingModule { }
