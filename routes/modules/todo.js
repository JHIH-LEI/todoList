const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo.js')

// 讓使用者新增資料的路由
router.get('/new', (req, res) => {
  res.render('new')
})

//新增todo,將表單資料送入資料庫
router.post('/', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定todo的詳細資料
router.get('/:id', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//更新資料
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router