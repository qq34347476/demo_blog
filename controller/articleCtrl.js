const path = require('path')
const conn = require(path.join(__dirname, './db.js'))
const moment = require('moment')
const marked = require('marked')


module.exports = {
    addArticleApi(req, res) {
        if (!req.session.islogin) res.redirect('/login')
        res.render(path.join(__dirname, '../views/article/add.ejs'), {
            user: req.session.user,
            islogin: req.session.islogin
        })
    },
    articleAddApi(req, res) {
        if (!req.session.islogin) res.redirect('/login')
        //创建新增(插入)sql语句
        let sqlStr = 'insert into blog_articles set ?';
        let insertDate = req.body;
        insertDate.ctime = moment().format('YYYY-MM-DD HH:MM:SS');

        //执行sql语句
        conn.query(sqlStr, insertDate, (err, result) => {
            if (err) return console.log('新增数据失败' + err);
            console.log(result);
            if (result.affectedRows != 1) return res.send({
                'status': 505,
                'msg': '发布失败',
                'data': result
            });
            res.send({
                'status': 200,
                'msg': '发布成功',
                'data': result
            })
        })
    },
    articleInfoApi(req, res) {
        let id = req.params.id;
        //创建查询sql语句
        let sqlStr = 'select * from blog_articles where id=?';
        //执行sql语句
        conn.query(sqlStr, id, (err, result) => {
            if (err) return res.render({
                'statys': 501,
                'msg': '查询sql失败',
                'data': err.message
            });

            //把markdown语法转换成html
            let html = marked(result[0].content);
            result[0].content = html;
            
            // console.log(req.session.islogin);
            res.render(path.join(__dirname, '../views/article/info.ejs'), {
                'user': req.session.user,
                'islogin': req.session.islogin,
                'content': result[0]
            });

        })

    },
    editApi(req, res) {
        if (!req.session.islogin) res.redirect('/login')

        let id = req.params.id;
        let sqlStr = 'select * from blog_articles where id=?';
        //执行sql语句
        conn.query(sqlStr, id, (err, result) => {
            if (err) return res.render({
                'status': 501,
                'msg': '查询sql失败',
                'data': err.message
            });
            // console.log(req.session.user);
            // console.log(result[0]);
            
            res.render(path.join(__dirname, '../views/article/edit.ejs'), {
                'user': req.session.user,
                'islogin': req.session.islogin,
                'article': result[0]
            })
        })
    },
    changeArticleApi(req, res) {
        if (!req.session.islogin) res.redirect('/login');

        let acticleId = req.params.acticleId
        //创建更新(修改)sql语句
        let sqlStr = 'update blog_articles set ? where id=?';
        let insertDate = req.body;
        //执行sql语句
        conn.query(sqlStr, [insertDate, acticleId], (err, result) => {
            if (err) return res.send({
                'status': 501,
                'msg': '更新失败',
                'data': err.message
            });
            res.send({
                'status': 200,
                'msg': '更新成功',
                'data': result
            });
        })

    }

}