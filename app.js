const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const methodOverride = require('method-override')

const app = express()
const routes = require('./routes') //載入總路由器
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

app.use(express.urlencoded({ extended: true }))//對所有的req先做處理
app.use(methodOverride('_method')) //路由中queryString有_method的http請求會先經過methodOverride的處理

app.use(routes) //使用總路由器

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})