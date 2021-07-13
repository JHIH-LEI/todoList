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

//新增todo,將表單資料送入資料庫
app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定todo的詳細資料
app.get('/todos/:id', (req, res) => {
  //取得該todo的id，作為資料查找
  const id = req.params.id
  //請model向資料庫找該筆資料
  return Todo.findById(id)
    //找到資料後回傳到這，要先把它清理成js物件
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//某todo的修改頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//更新資料
app.post('/todos/:id/edit', (req, res) => {
  //接住表單資料
  const { name, isDone } = req.body
  const id = req.params.id
  return Todo.findById(id)
    //把資料送到資料庫中更新
    //這邊不能用lean是因為他會變成單純是js陣列資料，但這筆資料是需要存到資料庫中的，會需要資料庫的格式
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'  //右邊會回傳true or false,在存到資料屬性中
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//刪除todo
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})