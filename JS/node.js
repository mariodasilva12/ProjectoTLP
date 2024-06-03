const express = require('express')
const mysql = require('mysql2')
const nodemon = require('nodemon')
const axios = require('axios')
const path = require('path')
const bodyParser = require('body-parser')

const port = 3000

const app = express()

//Configurar o body-parser para analisar requisições POST
app.use(express.urlencoded({extended:false}))
app.use(express.json())



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

app.post('/carros', (req, res) => {
    const data = {
        nome : req.body.nome,
        preco : req.body.preco,
        imagem : req.files.imagem.name
    }

    const sql = 'insert into carros set ?'

    conexao.query(sql,data, (erro, retorno) => {
        if(erro){
            res.json({'erro' : erro})
        }else{
            res.json(retorno)
        }
    })
})

//Servir arquivos estaticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname,'../HTML')))

//Rota para servir o teste.html
app.get('/carros', (req, res) => {
    res.sendFile(path.join(__dirname, '../HTML/teste/index.html'))
   
})


app.listen(port, (erro) =>{
    if(erro){
        console.log(erro)
    }else{
        console.log(`servidor rodando na porta http://localhost:${port}`)

    }
})