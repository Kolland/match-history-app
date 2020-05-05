import { EventModel } from './event.model';

export interface EventToDisplayModel extends EventModel {
    displayName: string
}