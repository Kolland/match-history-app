import { Document } from 'mongoose';

export enum EventTypes {
    kill = "kill",
    assist = "assist",
    death = "death"
}

export interface Event extends Document {
    type: EventTypes,
    time: number
}