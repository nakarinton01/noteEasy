import {Schema, model, Types} from "mongoose";

export interface IhistoryNote {
  // noteId: Types.ObjectId,
  name: String,
  category: {
    _id: Types.ObjectId,
    name: String,
  },
  note: String,
  tag: [],
  customer: {
    _id: Types.ObjectId,
    fullName: String,
    username: String,
  },
  createdAt: Date,
  updateAt: Date,
}

const historyNoteModel = new Schema({
  // noteId: { type: Types.ObjectId },
  name: { type: String },
  category: {
    _id: { type: Types.ObjectId },
    name: { type: String },
  },
  note: { type: String },
  tag: { type: Array, default: Array  },
  customer: {
    _id: { type: Types.ObjectId },
    fullName: { type: String },
    username: { type: String},
  },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})

export default model<IhistoryNote>('history note', historyNoteModel )