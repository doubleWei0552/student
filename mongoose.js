// 操作数据库的模块
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/zy-students')
var db = mongoose.connection

db.on('error', (err)=>{
    console.log('数据库连接失败')
})
db.on('open', ()=>{console.log('数据库连接成功')})

// 创建数据模型
var Student = mongoose.model('students', {
    name: String,
    age: Number,
    isMale: Boolean,
    phone: String,
    email: String,
    description: String,
    ip: String,
    createTime: Date,
    updateTime: Date
})

// 导出数据模型供外部使用
module.exports = Student