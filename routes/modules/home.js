const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo.js')

router.get('/', (req, res) => {
  // 顯示該使用者的所有todo
  const userId = req.user._id //變數設定，根據登陸者的userId
  Todo.find({ userId })
    .lean() //回傳js陣列資料
    .sort({ _id: 'asc' }) //根據新增todo的時間來排序
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

//匯出路由模組
module.exports = router