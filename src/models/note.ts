import {Schema, model, Types} from "mongoose";

export interface INote {
  name: { type: String },
  category: {
    _id: Types.ObjectId,
    name: String,
  },
  note: String,
  tag: [],
  createdAt: Date,
}

const noteModel = new Schema({
  name: { type: String },
  category: {
    _id: { type: Types.ObjectId },
    name: { type: String },
  },
  note: { type: String },
  tag: { type: Array },
  createdAt: { type: Date, default: Date.now },
})

export default model<INote>('note', noteModel )