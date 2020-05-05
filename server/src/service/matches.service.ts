import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from '../interfaces/match.interface';

@Injectable()
export class MatchesService {
    constructor(
        @InjectModel('Match') private matchModel: Model<Match>
    ) {}

    async getAll() {
        return this.matchModel.find().exec();
    }
}
