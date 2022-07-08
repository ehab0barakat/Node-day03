const express= require("express")
var app = express();
var mysql = require('mysql');
const cors = require('cors');


app.use(express.json());
app.use(cors());

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
    port:'3306',
	password:'',
	database:'lab05'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully');
	}
});

app.listen(4000);


app.get('/users', (req, res) => {
    connection.query('select * from users', (err, rows) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/users/:id', (req, res) => {
    connection.query('delete from users where id=?', [req.params.id], (err) => {
        if (!err){
            res.send('Post Deleted Successfully.')
        }
        else
            res.send(err);
    })
});


app.post('/users', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let email = req.body.email;
    
    var data = {
        name: name,
        age: age,
        email: email}

    var sql ='insert into users SET ?;'
    connection.query(sql, data, (err) => {
        if (!err) {
          res.send('Post has been insert')
        }
        else
            res.send(err);
    })
});



app.put('/users/:id', (req, res) => {
    var sql = "UPDATE users SET name = ?, age=?  , email=?  WHERE id=?;"
    console.log(req.body)
    connection.query(sql,  [req.body.name, req.body.age , req.body.email , req.params.id], (err, rows, ) => {
        if (!err) {
          res.send(rows)
        }
        else
            res.send(err);
    })
});

