
import fs from 'fs'

export const escapeRegExp = (str: String) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
export const replaceAll = (str: String, find: String) => {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), '***');
};
export const badwordReplace = async (text: String) => {
  let file = await fs.readFileSync('./src/file/badword.txt', 'utf8').toString().split('\n')
  for(let i=0; i< file.length; i++) [
    file[i] = file[i].replace('\r', '')
  ]
  for(let ele of file) {
    text = await replaceAll(text, ele)
  }
  return text
};
export const limitPage = async (limit: Number, page: Number) => {
  try {
    let pageData: Number = page ? page : 1
    let limitData: Number = limit ? limit : 10
    let skip: Number = Number(limitData) * (Number(pageData) - 1)
    let result: object = {
      limit: Number(limitData),
      skip: Number(skip)
    }
    return result
  } catch (error) {
    return error
  }
}