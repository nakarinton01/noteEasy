import {Types} from "mongoose";

export interface noteFilter {
  name: any,
  category: any,
  tag: any,
  // createdAt: any
  page: Number,
  limit: Number
}