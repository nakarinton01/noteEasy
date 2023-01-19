import { Request, ResponseToolkit } from "@hapi/hapi";
import Note from '../models/note'
import historyNoteModel from '../models/historyNote'
import catagoryModel from '../models/category'
import { badwordReplace, limitPage } from '../controllers/mainFunction'
import { noteFilter } from '../models/noteFilter'
import mongoose from "mongoose";


export const create = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let Notes = new Note(request.payload)
    if(!Notes.note) throw new Error('note is empty')
    Notes.note = await badwordReplace(Notes.note)
    if (!Notes.name) throw new Error('name is empty')

    const customer : { _id: any, fullName: any, username: any } = {
      _id: request.auth.credentials._id,
      fullName: request.auth.credentials.fullName,
      username: request.auth.credentials.username,
    }
    Notes.customer = customer
    
    await Notes.save()

    return {
      success: true,
      result: 'create success'
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};
export const getNote = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let filter = <noteFilter>request.query
    let pageAndskip: any = await limitPage(filter.limit, filter.page)
    let query = {}

    Object.assign(query, { 'customer.username': request.auth.credentials.username })
    filter.name !== '' ? Object.assign(query, { name: new RegExp(filter.name, 'i') }) : null
    filter.category !== '' ? Object.assign(query, { 'category._id': new mongoose.Types.ObjectId(filter.category) }) : null
    filter.tag !== '' ? Object.assign(query, { tag: new RegExp(filter.tag, 'i') }) : null
    
    let noteModel = await Note.aggregate([
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
          updateAt: 1,
        }
      }
    ])

    return {
      success: true,
      result: noteModel
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};
export const edit = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let Notes = new Note(request.payload)
    let noteModel: any = await Note.findOne({ _id: Notes._id })
    if(Notes.note !== noteModel.note) {
      Notes.note = await badwordReplace(Notes.note)
    }
    
    await Note.findOneAndUpdate({
      _id: Notes._id
    }, {
      name: Notes.name,
      category: Notes.category,
      note: Notes.note,
      tag: !Array.isArray(Notes.tag) ? [] : Notes.tag,
      updateAt: new Date(),
    })

    return {
      success: true,
      result: 'edit success'
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};

export const del = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let _id = request.params._id
    let noteModel: any = await Note.aggregate([
      {  $match: { _id: new mongoose.Types.ObjectId(_id)  } },
      {
        $project: {
          _id: 0,
          __v: 0
        }
      }
    ])
    noteModel[0].updateAt = new Date()
    let hsModel = new historyNoteModel(noteModel[0])
    await hsModel.save()
    await Note.findOneAndDelete({ _id: _id })

    return {
      success: true,
      result: 'delete success'
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};
export const category = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let categoryModel = await catagoryModel.find({ 'customer.username': request.auth.credentials.username }, { _id: 1, name: 1 })

    return {
      success: true,
      result: categoryModel
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};

export const cresteCategory = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let catagory = new catagoryModel(request.payload)
    let categoryModel = await catagoryModel.findOne({ 'customer.username': request.auth.credentials.username, name: catagory.name }, { _id: 1, name: 1 })
    if(categoryModel) throw new Error('catagory is already')
    
    const customer : { _id: any, fullName: any, username: any } = {
      _id: request.auth.credentials._id,
      fullName: request.auth.credentials.fullName,
      username: request.auth.credentials.username,
    }
    catagory.customer = customer
    await catagory.save()

    return {
      success: true,
      result: 'create success'
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};