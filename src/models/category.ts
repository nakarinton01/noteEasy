import {Schema, model, Types} from "mongoose";

export interface ICategory {
  name: String,
  customer: {
    _id: Types.ObjectId,
    fullName: String,
    username: String,
  },
}

const Category = new Schema({
  name: { type: String },
  customer: {
    _id: { type: Types.ObjectId },
    fullName: { type: String },
    username: { type: String},
  }
})

export default model<ICategory>('category note', Category )