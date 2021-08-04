const mongoose = require('mongoose')
// 將mongoose的Schema模組載入
const Schema = mongoose.Schema
// 新增todo的資料綱要
const todoSchema = new Schema({
  name: {
    type: String, //資料型別為字串
    require: true, //為必填項
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  userId: { //將todo與user collection關聯，1對多todos
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    require: true
  }
})


module.exports = mongoose.model('Todo', todoSchema) //設定models,將schema輸出，讓其他檔案也能操作和todo相關的資料