const mongoose = require('mongoose')
// 把Todo Model物件載進來，才能操作該model
//每一個 model 物件都具有一系列的資料操作方法
const Todo = require('../todo')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  // 在和資料庫連線時，產生種子資料
  for (let i = 0; i < 10; i++) {
    Todo.create({
      name: `name-${i}`
    })
  }
})