import { EventTypes } from '../enums/event-types.enum';

export interface EventModel {
    _id: number,
    type: EventTypes,
    time: number
}