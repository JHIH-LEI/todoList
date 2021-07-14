const db = require('../../config/mongoose.js') //先執行mongoose連線，並取得該檔案中的連線狀態db

// 把Todo Model物件載進來，才能操作該model
//每一個 model 物件都具有一系列的資料操作方法
const Todo = require('../todo')

db.once('open', () => {
  // 在和資料庫連線時，產生種子資料
  for (let i = 0; i < 10; i++) {
    Todo.create({
      name: `name-${i}`
    })
  }
})