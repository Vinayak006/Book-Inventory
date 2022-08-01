require('dotenv').config()
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.pw ,
    database: "books"
});
let upid;

function showbook(req,res){
    con.query(
        "select * from book",
        (err,result,field)=>{
            res.render('result', {
                process: 'sb',
                result: 'Book in directory',
                helo: result
            });
        }
    );
}

function getbook(req,res){
    con.query(
        `select * from book where id = ${req.query["id"]}`,
        (err,result,field)=>{
            (result.length==0) ? res.render('result',{
                result: `No book found with the entered book id'${req.query["id"]}'`,
            }) : res.render('result', {
                helo: result,
                process: 'gb',
                result: `Book details of the entered id '${req.query["id"]}'`
            })
        }
    );
}

function addbook(req,res){
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;
    let year = req.body.year;
    con.query(
        "select max(id) as maxid from book",
        (err,result,field)=>{
            let len = result[0].maxid;
            con.query(
                "select * from book",
                (err,result,field)=>{
                    for(let i=0; i < len; i++){
                        if(result[i] == undefined) continue
                        if(id == result[i].id){
                            return res.send(`intha id '${id}' la already "${result[i].name}" nu oru book iruku friend`);
                        } 
                        if(name == result[i].name) {
                            return res.send(`"${name}" book already intha id '${result[i].id}' la iruku friend `);
                        }
                    }
                    con.query(
                        `insert into book (id, name, author, year) values (${Number(id)},"${name}", "${author}", ${Number(year)})`,
                        (err,result,field)=>{
                            res.render('result', {
                                result: `Book '${name}' is added to the directory'`,
                                process: 'audb'
                            });
                        }
                    );
                }
            );
        }    
    );
}

function updatebook(req,res){
    let id = req.query["id"];
    upid=id;
    con.query(
        `select * from book where id = ${id}`,
        (err,result,field)=>{
            (result.length==0) ? res.render('result',{
                result:`No book found with the id '${id}'`
            }) : res.sendFile(__dirname + "/" + "updatebook.html");
        }
    );
}

function updateboook(req,res){
    let {name, author, year} = req.query;
    con.query(
        `update book set name = "${name}", author = "${author}", year = ${year} where id = ${upid}`,
        (err,result,field)=>{
            res.render('result', {
                id: upid,
                result: `Book with id '${upid}' updated`,
                process: 'audb'
            });
        }
    );
}

function deletebook(req,res){
    let id = req.body.id;
    con.query(
        `select * from book where id = ${id}`,
        (err,result,field)=>{
            if(result.length==0){
                res.json(`Can't delete, No book found in the id '${id}' `);
            }
            else{
                let name = result[0].name;
                con.query(
                    `delete from book where id = ${id}`,
                    (err,result,field)=>{
                        res.render('result', {
                            result: `Book '${name}' deleted from the directory`,
                            process: 'audb'
                        });
                    }
                );
            }
        }
    );
}

module.exports = {showbook, getbook, addbook, updatebook, updateboook, deletebook}