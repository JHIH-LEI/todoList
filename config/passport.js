const passport = require('passport')
// 載入相關模組,在此為登陸策略中的本地策略
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

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
          return done(null, false, { message: '此Email尚未註冊' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: '帳密或密碼錯誤' })
          }
          return done(null, user)
        })
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