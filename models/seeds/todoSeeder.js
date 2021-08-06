if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() //把mongodb uri放進環境變數
}
const db = require('../../config/mongoose.js') //先執行mongoose連線，並取得該檔案中的連線狀態db
const bcrypt = require('bcryptjs')

// 把Todo Model物件載進來，才能操作該model
//每一個 model 物件都具有一系列的資料操作方法
const Todo = require('../todo')
const User = require('../user')

const SEED_USER = {
  name: 'Alicia',
  email: '123@gmail.com',
  password: '123'
}

db.once('open', () => {
  User.findOne({ email: SEED_USER.email })
    .then(user => {
      if (user) {
        console.log('email already exist')
        process.exit() //把程序結束，離開terminal
      }
      //新增使用者
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
        //新增該使用者的todo
        .then(user => {
          const userId = user._id
          //確保等待資料庫回應完非同步請求，才繼續執行.then
          return Promise.all(Array.from(
            { length: 10 },
            (_, i) => Todo.create({ name: `todo${i}`, userId })
          ))
        })
        .then(() => {
          console.log('done')
          process.exit() //把程序結束，離開terminal
        })
        .catch(err => console.log(err))
    })
})