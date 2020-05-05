import { Component, OnInit } from '@angular/core';
import { EventsApiService } from './services/events-api.service';
import { Observable, of } from 'rxjs';
import { MatchModel } from './models/match.model';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss']
})
export class EventsViewComponent implements OnInit {
  matches$: Observable<MatchModel[]>;

  constructor(private serverService: EventsApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.matches$ = this.serverService.getMatches().pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.error.message || e.error.error);
        return of([])
      })
    );
  }

}
