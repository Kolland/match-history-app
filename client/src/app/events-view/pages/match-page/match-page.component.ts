import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { EventsApiService } from '../../services/events-api.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss']
})
export class MatchPageComponent implements OnInit {
  private matchId: string;
  events$: Observable<EventModel[]>;

  constructor(
    private serverService: EventsApiService, 
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.data.matchId;
    
    this.events$ = this.serverService.getMatchEvents(this.matchId).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.error.message || e.error.error);
        return of([])
      })
    );
  }
}
