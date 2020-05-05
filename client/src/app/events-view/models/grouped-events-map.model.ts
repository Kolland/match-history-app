import { EventToDisplayModel } from './event-to-display.model';

export interface GroupedEventsMapModel {
  position: string;
  displayPoint: EventToDisplayModel,
  points: EventToDisplayModel[]
}