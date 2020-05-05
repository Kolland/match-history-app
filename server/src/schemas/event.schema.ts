import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['kill', 'death', 'assist'],
  },
  time: Number,
});