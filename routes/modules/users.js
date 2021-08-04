const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')
router.get('/login', (req, res) => {
  res.render('login')
})

// 驗證req 登陸狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得表單資料
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已註冊過
  User.findOne({ email }).then(user => {
    if (user) {
      // 如果已註冊過，給予提示並返回註冊頁
      console.log('user already exists')
      res.render('register', { name, email, password, confirmPassword })
    } else {
      // 如果還沒註冊，寫入資料
      User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout() //passport將session中的登陸狀態清掉
  res.redirect('/users/login')
})

module.exports = router