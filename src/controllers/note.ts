import { Request, ResponseToolkit } from "@hapi/hapi";
import Note from '../models/note'
import fs from 'fs'

export const create = async ( request: Request, h: ResponseToolkit ) => {
  try {
    let Notes = new Note(request.payload)
    let file = await fs.readFileSync('./src/file/badword.txt', 'utf8').toString().split('\n')
    let noteText: String = Notes.note
    const reEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let isInclude = file.some(word => noteText.includes(word))
    // let newBadword = 
    // let regex = /`${file}`/i
    // let reEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    // let fileSE = new RegExp(file.map(reEscape).join('|'))


    return {
      success: true,
      result: isInclude
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message
    }
  }
};