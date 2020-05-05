import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatchIdResolver implements Resolve<string> {
    resolve(route: ActivatedRouteSnapshot): Observable<string> | Promise<string> | string {
        return route.params.id;
    }
}