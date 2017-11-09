var express = require('express')
var Student = require('../../mongoose')
var route = express.Router()

// getPages()用于生成当前显示的页码范围
function getPages(page, pageCount) {
    var pages = [page]

    var left = page - 1
    var right = page + 1

    while (pages.length < 5 && (left >= 1 || right <= pageCount)) {
        if (left > 0) pages.unshift(left--)
        if (right <= pageCount) pages.push(right++)
    }
    console.log(pages)
    return pages
}

// 实现了翻页
// /:page表示/后必须有参数
// /(:page)表示/后的参数可传可不传
// 传参数时可以通过page得到这个参数req.params.page
// 如果不传就是undefined
route.post('/(:page)?', (req, res)=>{
    // 查询条件
    var filter = {}
    // 通过"姓名"查找
    var name = req.body.name
    if (name) {
        name = name.trim()
        if (name.length > 0) {
            filter.name = {
                // $regex：正则表达式
                // MongoDB 使用 $regex 操作符来设置匹配字符串的正则表达式
                // 参考：http://www.runoob.com/mongodb/mongodb-regular-expression.html
                // .表示除回车换行外的任意字符
                // *表示0个或多个
                // ?表示可以有也可以没有
                '$regex': `.*?${name}.*?`
            }
        }
    }

    // 通过"性别"查找
    var isMale = req.body.isMale
    if (isMale) {
        isMale = isMale.trim()
        if (isMale.length > 0) {
            filter.isMale = isMale == 'true'
        }
    }

    // 通过"电话号码"查找
    var phone = req.body.phone
    console.log(phone)
    if (phone) {
        phone = phone.trim()
        if (phone.length > 0) {
            filter.phone = {
                '$regex': `.*?${phone}.*?`
            }
        }
    }

    var page = req.params.page
    
    // 如果page是数字， page || 1 运算结果是page
    // 如果page是undefined，page || 1 运算结果是1
    page = page || 1
    console.log("当前页码：" + page)
    page = parseInt(page)

    // 分页基数为5：即每次显示5个学生
    var pageSize = 5
    console.log(filter)
    Student.find(filter).count((err, total)=>{
        // 学生总数
        console.log("共有学生：" + total)
        if (err) {
            // 跳转到错误页面
        }else{
            // 统计应该分几页
            // 如果total / pageSize除不尽，需要向上取整
            var pageCount = Math.ceil(total / pageSize)
            console.log(pageCount)
            // skip()：跳过
            // limit()：限制
            Student.find(filter)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select('name isMale age phone email')
            .exec((err, data)=>{
                if (err) {
                    res.json({code: 'error', message: '系统错误'})
                }else{
                    // 把查询到的数据返回给客户端
                    res.json({
                        code: 'success',
                        // 当前页码
                        page,
                        // 页码总数
                        pageCount,
                        // 当前页码范围
                        pages: getPages(page, pageCount),
                        students: data
                    })
                }
            })
        }
    })
})

module.exports = route