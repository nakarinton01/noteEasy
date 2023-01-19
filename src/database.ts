
import mongoose from "mongoose";
require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env
mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}.lohsbkk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('DB Connect');
}).catch((err: any) => {
  console.log('DB Connect fail');
  console.log(err);
})