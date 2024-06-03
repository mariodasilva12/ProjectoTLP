const express = require('express')
const nodemon = require('nodemon')
const mysql = require('mysql2')
const cors = require('cors')
const axios = require('axios')


const port = 5501

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

//Conectar ao MYSQL
const conexao = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "",
        database : "socarro",
    }
)

//Testar Conexão
conexao.connect((erro, retorno) => {
    if(erro){
        console.log("Bag na conexão")
    }else{
         console.log('conectando...')
    }
})


//Rota para inserir dados

app.post('/usuarios', (req, res) => {
    const {nome ,email} = req.body

    const sql = `insert into usuarios(nome,email) values('${nome}','${email}');`

    conexao.query(sql, (erro, retorno) => {
        if(erro){
            res.json({'erro' : erro})
        }else{
            res.json(retorno)
        }
    })
})



app.get('/usuarios', (req, res) => {
    const sql = 'select * from usuarios'
 
    conexao.query(sql, (erro,retorno) =>{
     if(erro){
         res.json({'erro' : erro})
     }else{
         res.send(retorno)
     }
    })
 }) 

app.delete('/usuarios/:id', (req,res) =>{
    const id = req.params.id
    const sql = `delete from usuarios where id = ${id}`

    conexao.query(sql, (erro, retorno) => {
        if(erro){
            res.json({'erro': erro})
        }else{
            res.json(retorno)
        }
    })
})


app.put('/usuarios/:id', (req,res) =>{
    const id = req.params.id
    const {nome, email} = req.body
    
    const sql = `update usuarios set nome = '${nome}' , email ='${email}'  where id = ${id};`

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
