const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

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

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})