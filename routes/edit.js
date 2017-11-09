var express = require('express')
var Student = require('../mongoose')

var route = express.Router()

route.get('/:id', (req, res)=>{
    Student.findById(req.params.id, (err, data)=>{
        if (err) {
            // 
        }else{
            // 渲染"编辑"页面
            res.render('edit', {
                student: data
            })
        }
    })
})

module.exports = route