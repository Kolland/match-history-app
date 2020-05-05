import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { EventTypes } from '../../enums/event-types.enum';
import { EventToDisplayModel } from '../../models/event-to-display.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent {
  @Input() event: EventToDisplayModel;
  eventTypes = EventTypes;
}
