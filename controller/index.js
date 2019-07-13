const path = require('path');
const conn = require(path.join(__dirname,'./db'));


module.exports = {
    index(req, res) {

        res.render('index.ejs', {
            user: req.session.user,
            islogin: req.session.islogin
        })
    },
    //查询列表  参数 currentPage  pageSize
    getList(req,res){
        //创建查询sql语句
        let sqlStr = `SELECT
        a.id as articlesId,a.title,a.ctime,u.nickname
    FROM
        blog_articles as a
    LEFT JOIN blog_users as u ON a.authorId=u.id
    ORDER BY a.ctime DESC
    LIMIT ?,?`;
        let insertDate = req.body
        
        //执行sql语句
        conn.query(sqlStr, [parseInt(insertDate.currentPage - 1)*parseInt(insertDate.pageSize),parseInt(insertDate.pageSize)], (err, result) => {
            if (err) return res.send({status:505,data:result,msg:'查询失败'});
            res.send({status:200,data:result,msg:'查询成功'})
        });
    },
    getCount(req,res){
        let getCount = `SELECT count(1) as count FROM blog_articles`;
        conn.query(getCount,(err,result) => {
            if (err) return res.send({status:506,data:result,msg:'查询失败'});
            res.send({status:200,data:result,msg:'查询成功'})
        });
    }
}