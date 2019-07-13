//下载express  npm i express -S
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 80

const cors = require('cors')
var whitelist = ['http://127.0.0.1:5500']  //白名单，允许跨域的名单
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))


// npm install express-session -S
//导入express-session 中间件插件
const session = require('express-session')
// 启用 session 中间件
app.use(session({
    secret: 'keyboard cat', // 相当于是一个加密密钥，值可以是任意字符串
    resave: false, // 强制session保存到session store中
    saveUninitialized: false // 强制没有“初始化”的session保存到storage中
}))

app.use('/node_modules', express.static('./node_modules')); //设置托管静态资源文件

// 设置路由
fs.readdir(path.join(__dirname, './router'), (err, fileNames) => {
    if (err) return console.log('读取文件目录失败!');
    fileNames.forEach(element => {
        const router = require(path.join(__dirname, './router', element));
        app.use(router);
    });
})



app.set('view engine', 'ejs') // 设置ejs模板引擎 
app.set('views', './views') // 设置ejs模板页面默认存放路径 



app.listen(port, () => console.log(`Server running at  http://127.0.0.1:${port}`))