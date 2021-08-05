const passport = require('passport')
// 載入相關模組,在此為登陸策略中的本地策略
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

// 直接匯出函式給app.js，並接受app作為參數
module.exports = app => {
  // middleware 設定
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定登陸策略，第一個參數：把預設username改為email，第二個參數：函式，要做登陸策略的相關設定
  passport.use(new localStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('warning_msg', '此Email尚未註冊')
          return done(null, false, { message: 'Email have not registered!' })
        }
        if (user.password !== password) {
          req.flash('warning_msg', '帳號或密碼錯誤')
          return done(null, false, { message: 'Email or password incorrect.' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化、反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}