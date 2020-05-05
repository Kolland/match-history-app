import { Document } from 'mongoose';

export interface Match extends Document {
    createdAt: string;
}