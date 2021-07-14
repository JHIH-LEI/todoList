const mongoose = require('mongoose')

// 設定資料庫連線
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 儲存資料庫連線的狀態，以供日後操作
const db = mongoose.connection

// 掛上監聽器,連線成功,給我們提示
db.once('open', () => {
  console.log('mongodb connected!')
})

// 連線失敗
db.on('error', () => {
  console.log('mongodb error!')
})

module.exports = db //種子資料需要使用db