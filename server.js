var express = require('express')
var bodyParser = require('body-parser')
// 导入数据库操作的模块
// require('./mongoose')：加载当前目录下的mongoose.js
var Student = require('./mongoose')
// art-template3.X写法
var template = require('art-template')
// 禁用模板缓存
template.config('cache', false)

var app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded())

// 指定渲染views目录下的.html视图
app.engine('html', template.__express)
app.set('view engine', 'html')

// 处理请求
// 使用路由技术将代码拆分到多个文件中
// 添加一个学生
// 表示：客户端如果向/add发请求，那么就调用routes目录下的add模块处理该请求
app.use('/api/index', require('./routes/api/index'))
app.use('/api/student', require('./routes/api/student'))
// 打开"编辑"页面
app.use('/edit', require('./routes/edit'))
app.use('/add', require('./routes/add'))


app.listen(3000, ()=>{
    console.log('服务器启动成功')
})


