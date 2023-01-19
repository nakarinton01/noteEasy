import { Request, ResponseToolkit } from "@hapi/hapi";
import historyNoteModel from '../models/historyNote'
import Note from '../models/note'
import { noteFilter } from '../models/noteFilter'
import { limitPage } from '../controllers/mainFunction'
import mongoose from "mongoose";

export const getHistory = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let filter = <noteFilter>request.query
    let pageAndskip: any = await limitPage(filter.limit, filter.page)
    let query = {}

    Object.assign(query, { 'customer.username': request.auth.credentials.username })
    filter.name !== '' ? Object.assign(query, { name: new RegExp(filter.name, 'i') }) : null
    filter.category !== '' ? Object.assign(query, { 'category._id': filter.category }) : null
    filter.tag !== '' ? Object.assign(query, { tag: filter.tag }) : null
    
    let hsModel = await historyNoteModel.aggregate([
      { $match: query },
      { $sort: { updateAt: -1} },
      { $skip: pageAndskip.skip },
      { $limit: pageAndskip.limit },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          note: 1,
          tag: 1,
          createdAt: 1,
          updateAt: 1
        }
      }
    ])

    return {
      success: true,
      result: hsModel
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};

export const recovery = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let _id = request.params._id
    // let hsModel = await historyNoteModel.findOne({ _id: _id })
    let hsModel: any = await historyNoteModel.aggregate([
      {  $match: { _id: new mongoose.Types.ObjectId(_id)  } },
      {
        $project: {
          _id: 0,
          __v: 0
        }
      }
    ])
    hsModel[0].createdAt = new Date()
    hsModel[0].updateAt = new Date()

    let notes = new Note(hsModel[0])
    await notes.save()
    await historyNoteModel.findOneAndDelete({ _id: _id })

    return {
      success: true,
      result: 'success'
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};