module.exports = function(app, mysqlClient){
    app.get('/todos',function(req, res){
      mysqlClient.query('select * from todos', function(error, result){
        (error) ? console.log(error) : res.json(result);
      })
    });

    app.get('/todos/:index', function(req, res){
      mysqlClient.query('select * from todos where id=?', [req.params.index], function(error, result){
        (error) ? console.log(error) : res.json(result);
      })
    });

    app.post('/todos', function(req, res){
      mysqlClient.query('insert into todos(title, content) values(?,?)', [req.body.title, req.body.content], function(error, result){
        (error) ? console.log(error) : res.json(result);
      })
    });

    app.delete('/todos/delete/:index', function(req, res, next){
      mysqlClient.query('delete from todos where id = ?', [req.params.index], function(error, result){
        (error) ? console.log(error) : res.json(result);
      })
    });
}
