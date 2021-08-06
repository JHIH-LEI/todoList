const express = require('express')
const session = require('express-session')
// 載入passport設定檔，要載在session之後
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  //將敏感資訊放到環境變數中
  require('dotenv').config()
}
require('./config/mongoose.js') //載入mongoose連線設定
const routes = require('./routes') //載入總路由器

const app = express()
const port = process.env.PORT

// 設定樣板engine
// 新增名為hbs的樣板engine，並做一些參數設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET, //設定密鑰，將session id跟密鑰產出簽章，伺服器會檢查簽章是否有效，能防止竄改冒用的疑慮
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))//對所有的req先做處理
app.use(methodOverride('_method')) //路由中queryString有_method的http請求會先經過methodOverride的處理
app.use(flash())
usePassport(app)
// 設定讓前端樣板可以拿到的參數，放在回應參數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error') //登陸驗證的錯誤訊息
  next()
})
app.use(routes) //使用總路由器
app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})