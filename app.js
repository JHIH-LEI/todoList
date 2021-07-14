const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

require('./config/mongoose.js') //載入mongoose連線設定
const routes = require('./routes') //載入總路由器

const app = express()
const port = 3000

// 設定樣板engine
// 新增名為hbs的樣板engine，並做一些參數設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))//對所有的req先做處理
app.use(methodOverride('_method')) //路由中queryString有_method的http請求會先經過methodOverride的處理

app.use(routes) //使用總路由器

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})