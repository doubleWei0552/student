var express = require('express')
// 加载操作数据库的模块
var Student = require('../../mongoose')

var route = express.Router()

// 新增
route.post('/add', (req, res)=>{
    req.body.ip = req.ip
    req.body.createTime = new Date()
    req.body.updateTime = req.body.createTime
    // 浏览器端向/api/student/add发请求
    new Student(req.body).save((error)=>{
        if (error) {
            res.json({
                code: 'error',
                message: '保存失败'
            })
        }else res.json({
            code: 'success',
            message: '成功的保存了一个学生信息'
        })
    })
})

// 编辑学生信息
route.post('/edit/:id', (req, res)=>{
    req.body.ip = req.ip
    req.body.updateTime = new Date()

    Student.findByIdAndUpdate(req.params.id, req.body, (err)=>{
        if (err) {
            res.json({code: 'error', message: '系统错误'})
        }else re.json({code: 'success', message: '成功'})
    })
})

// 删除
route.post('/remove/:id', (req, res)=>{
    Student.findByIdAndRemove(req.params.id, (err)=>{
        if (err) {
            //
            res.json({
                code: 'error',
                message: '系统错误'
            }) 
        }else{
            res.json({
                code: 'success',
                message: '成功'
            })
        }
    })
})

module.exports = route