const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const todo = require('./models/todo')
const app = express()
const port = 3000

// 設定樣板engine
// 新增名為hbs的樣板engine，並做一些參數設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

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

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // 藉由該資料的model跟資料庫要所有的資料顯示
  Todo.find()
    .lean() //回傳js陣列資料
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

// 讓使用者新增資料的路由
app.get('/todos/new', (req, res) => {
  res.render('new')
})

//將表單資料送入資料庫
app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})