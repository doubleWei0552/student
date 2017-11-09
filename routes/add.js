var express = require('express')
// 用express调用Router()方法创建路由对象
var route = express.Router()

route.get('/', (req, res)=>{
    res.render('add')
})

// 导出该路由对象
module.exports = route