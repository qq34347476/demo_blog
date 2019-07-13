const path = require('path')
const conn = require(path.join(__dirname, './db.js'))
const moment = require('moment')
const bcrypt = require('bcrypt')

const power = 10

module.exports = {
    //测试
    testApi: (req, res) => res.send('测试'),

    //注册
    registerApi: (req, res) => {
        //创建查询sql语句
        let sqlStr = 'select count(1) as count from blog_users where username=?';
        let insertDate = req.body

        //执行sql语句
        conn.query(sqlStr, insertDate.username, (err, result) => {
            insertDate.ctime = moment().format('YYYY-MM-DD HH:MM:SS')

            if (err) return res.send({
                'status': 500,
                'msg': '查询失败',
                'data': result
            });
            if (result[0].count == 1) return res.send({
                'status': 501,
                'msg': '查询失败(用户名重复)',
                'data': result
            });

            console.log(insertDate);

            bcrypt.hash(insertDate.password, power, (err, pwd) => {
                if (err) return res.send({
                    'status': 503,
                    'msg': '加密失败',
                    'data': err
                })
                insertDate.password = pwd;

                //执行注册添加
                let sqlStrAdd = 'insert into blog_users set ?';
                conn.query(sqlStrAdd, insertDate, (err, result) => {
                    if (err) return res.send({
                        'status': 502,
                        'msg': '新增失败',
                        'data': result
                    });
                    res.send({
                        'status': 200,
                        'msg': '新增成功',
                        'data': result
                    })
                })
            })
        })
    },

    //登陆
    loginApi: (req, res) => {
        //创建查询sql语句
        let sqlStr = 'select * from blog_users where username=?';
        let insertDate = req.body;

        //执行sql语句
        conn.query(sqlStr, insertDate.username, (err, result) => {
            if (err) return res.send({
                'status': 500,
                'msg': '查询失败',
                'data': result
            });
            if (result == []) return res.send({
                'status': 503,
                'msg': '用户名错误',
                'data': result
            });

            bcrypt.compare(insertDate.password, result[0].password, (err, flag) => {
                if (err) return res.send({
                    'status': 504,
                    'msg': '验证错误',
                    'data': err
                })
                if (!flag) return res.send({
                    'status': 505,
                    'msg': '密码错误',
                })

                // 将登录的用户保存到session中
                req.session.user = result[0];
                req.session.islogin = true;

                res.send({
                    'status': 200,
                    'msg': '查询成功(有此用户)',
                    'data': result
                });
            })
        })
    },

    logoutApi(req, res) {
        req.session.destroy(function (err) {
            if (err) throw err;
            console.log('用户退出成功！');
            // 实现服务器端的跳转，这个对比于 客户端跳转
            res.redirect('/');
        });
    }
}
