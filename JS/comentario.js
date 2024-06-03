const express = require('express')
const mysql = require('mysql2')
const nodemon = require('nodemon')
const axios = require('axios')
const cors = require('cors')


const port = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})


const conexao = mysql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'socarro'
    }
)

conexao.connect((erro,retorno) =>{
    if(erro) throw erro;

    console.log('Conexão com sucessso!')
})



app.post('/comentarios', (req, res) => {
    const descricao = JSON.stringify(req.body)
    const sql = `insert into comentarios(descricao) values('${descricao}');`

    conexao.query(sql, (erro, retorno) =>{

        if(erro){
            res.json({'erro' : erro})
        }else{
            res.json(retorno)
        }
    })
})

app.get('/comentarios', (req, res) => {
    const sql = 'select * from comentarios'
 
    conexao.query(sql, (erro,retorno) =>{
     if(erro){
         res.json({'erro' : erro})
     }else{
         res.send(retorno)
     }
    })
 })

 
app.delete('/comentarios/:id', (req,res) =>{
    const id = req.params.id
    const sql = `delete from comentarios where id = ${id}`

    conexao.query(sql, (erro, retorno) => {
        if(erro){
            res.json({'erro': erro})
        }else{
            res.json(retorno)
        }
    })
})


app.put('/comentarios/:id', (req,res) =>{
    const id = req.params.id
    const dado =JSON.stringify(req.body)
    const sql = `update comentarios set descricao = '${dado}'  where id = ${id}`

    conexao.query(sql, (erro, retorno) => {
        if(erro){
            res.json({'erro': erro})
        }else{
            res.json(retorno) 
        }
    })
})


app.listen(port,()=>{
    console.log('Servidor')
})