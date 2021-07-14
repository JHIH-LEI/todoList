// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 準備引入路由模組
const home = require('./modules/home.js')
const todo = require('./modules/todo.js')

router.use('/', home)
router.use('/todos', todo)
// 匯出路由器
module.exports = router