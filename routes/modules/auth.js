const express = require('express')
const router = express.Router()
const passport = require('passport')

//向fb請求資料(FB登陸)
router.get('/facebook', passport.authenticate('facebook', {
  //我們向fb要求的資料
  scope: ['public_profile']
}))
//使用者同意授權後
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router