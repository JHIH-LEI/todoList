# todoList

## 專案源起
用來練習資料的CRUD操作、使用者登陸（使用Passport）

## 專案畫面
![](https://i.imgur.com/ZZXg5rN.png)
![](https://i.imgur.com/lSTNA3E.png)

## 功能
使用者能註冊帳號
使用者能登陸帳號
使用者能使用FB登陸帳號
使用者能新增一筆Todo
使用者能刪除一筆Todo
使用者能修改一筆Todo
使用者能查看一筆特定Todo
使用者能查看所有自己的Todo

## 環境
Node.js v10.15.0

## 套件

    "connect-flash": "^0.1.1",
    
    "bcryptjs": "^2.4.3",
    
    "dotenv": "^10.0.0",
    
    "express": "^4.17.1",
    
    "express-handlebars": "^5.3.2",
    
    "express-session": "^1.17.2",
    
    "method-override": "^3.0.0",
    
    "mongoose": "^5.13.2",
    
    "passport": "^0.4.1",
    
    "passport-facebook": "^3.0.0",
    
    "passport-local": "^1.0.0"
    
## 安裝
1.打開terminal，clone此專案至您的電腦

git clone https://github.com/JHIH-LEI/todoList

2.移至此專案資料夾

cd todoList

3.安裝npm套件

在終端機中輸入

npm install

4.回到此專案，利用npm安裝相關套件

npm install

5.下載種子資料

npm run seed

會得到一個測試用的帳密

123@gmail.com
123

當然，您也可以自行在網頁註冊一個屬於您的帳密

6.啟動專案

npm run dev

看到app is listening on http://localhost:3000 代表已經成功運行！
