const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')
router.get('/login', (req, res) => {
  res.render('login')
})

// 驗證req 登陸狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true, //使用登陸策略，驗證cb中的不同錯誤訊息
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得表單資料
  const { name, email, password, confirmPassword } = req.body
  const errors = [] //存放多種情況的錯誤訊息，因為錯誤訊息可能不止一個
  //檢查欄位是否都被填寫完
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  // 檢查密碼和確認密碼是否相符
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  // 如果有以上錯誤，就不用再做找資料的動作
  if (errors.length) {
    res.render('register', { name, email, password, confirmPassword, errors })
  }
  // 檢查使用者是否已註冊過
  User.findOne({ email }).then(user => {
    if (user) {
      // 如果已註冊過，給予提示並返回註冊頁
      errors.push({ message: '這個Email已經被註冊' })
      return res.render('register', { name, email, password, confirmPassword, errors })
    }
    // 如果還沒註冊，寫入資料
    // 將密碼加密後，存回去
    bcrypt
      .genSalt(10) //產生鹽，設定複雜度係數為10
      .then(salt => bcrypt.hash(password, salt)) //幫密碼加鹽，產生hash值
      .then(hash => User.create({
        name,
        email,
        password: hash //用雜湊值取代原本的使用者密碼 
      }))
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })
})

router.get('/logout', (req, res) => {
  req.logout() //passport將session中的登陸狀態清掉，以及req.user清掉
  req.flash('success_msg', '您已經成功登出')
  res.redirect('/users/login')
})

module.exports = router