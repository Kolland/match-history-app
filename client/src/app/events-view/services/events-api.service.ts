import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventModel } from '../models/event.model';
import { MatchModel } from '../models/match.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: 'root' })
export class EventsApiService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  getMatches(): Observable<MatchModel[]> {
    return this.httpClient.get<MatchModel[]>(`${environment.api}/matches`)
  }

  getMatchEvents(id: string): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>(`${environment.api}/matches/${id}/events`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.message);
        return of([])
      })
    )
  }
}