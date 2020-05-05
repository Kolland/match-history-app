import { Component, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { fromEvent, interval, Subscription } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { GroupedEventsMapModel } from '../../models/grouped-events-map.model';
import { EventToDisplayModel } from '../../models/event-to-display.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
  groupedEventsMap: GroupedEventsMapModel[];
  private _events: EventModel[];
  @Input() set events(events) {
    this._events = events;
    this.updatePoints();
  };

  get events() {
    return this._events;
  }

  @ViewChild('timeline') timeline;
  private windowResizeSubscription: Subscription;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.updatePoints();

    this.windowResizeSubscription = fromEvent(window, 'resize')
      .pipe(debounce(() => interval(200)))
      .subscribe(e => {
        this.updatePoints();
      })
  }

  ngOnDestroy() {
    if(this.windowResizeSubscription) {
      this.windowResizeSubscription.unsubscribe();
    }
  }

  buildGroupedEventsMap(timelineWidth: number): GroupedEventsMapModel[] {
    const POINT_WIDTH = 40;
    const maxTimeValue = this._events[this._events.length - 1].time;
    const maxPointAmount = Math.round(timelineWidth / POINT_WIDTH);
    const minimumTimePointDistance = maxTimeValue / maxPointAmount;
    const groupedEvents = this.groupEvents(minimumTimePointDistance);

    
    const groupedEventsMap = groupedEvents.map(events => {
      return {
        position: `${events[0].time * 100 / maxTimeValue}%`,
        displayPoint: events[0],
        points: events
      }
    })

    return groupedEventsMap
  }

  groupEvents(minimumTimePointDistance: number): EventToDisplayModel[][] {
    const groupedEvents: EventToDisplayModel[][] = [];
    let events: EventToDisplayModel[] = [];

    this._events.forEach((event, index) => {
      const eventToDisplay = {
        ...event,
        displayName: `E${index + 1}`
      }

      const isEventOnSafeDistance = events.length && (events[0].time + minimumTimePointDistance) < eventToDisplay.time;

      if (isEventOnSafeDistance) {
          groupedEvents.push(events);
          events = [eventToDisplay];
      } else {
        events.push(eventToDisplay)
      }

      const ifLastIteration = index === (this._events.length - 1)

      if(ifLastIteration) {
        groupedEvents.push(events);
      }
    })

    return groupedEvents;
  }

  updatePoints() {
    
    if(!this.timeline || !this._events?.length) {
      return
    }
    this.groupedEventsMap = this.buildGroupedEventsMap(this.timeline.nativeElement.offsetWidth);
    this.cd.detectChanges();
  }

}
