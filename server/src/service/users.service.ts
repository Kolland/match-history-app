import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<User>
    ) {}

    async findOne(email: string) {
        return this.userModel.findOne({email}).exec();
    }

    async create(user: User | {}) {
        return this.userModel.create(user);
    }

    async exists(email: string): Promise<boolean> {
        const user = await this.findOne(email);

        return user ? true : false;
    }
}
