const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo.js')

router.get('/', (req, res) => {
  // 藉由該資料的model跟資料庫要所有的資料顯示
  Todo.find()
    .lean() //回傳js陣列資料
    .sort({_id:'asc'}) //根據新增todo的時間來排序
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

//匯出路由模組
module.exports = router