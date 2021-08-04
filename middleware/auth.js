// 設定與使用者認證有關的middleware(在此會匯出一個function)
// 設定權限，有登陸才能使用，否則要登陸
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}