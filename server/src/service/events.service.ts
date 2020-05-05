import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../interfaces/event.interface';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel('Event') private eventModel: Model<Event>
    ) {}

    async getAll() {
        return this.eventModel.find().exec();
    }
}
