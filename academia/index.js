const express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql')
const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static("public"))

app.use(
    express.urlencoded({
        extended:true,
    })
)

app.use(express.json())


app.get('/addmatricula', (req, res) =>{
    res.render('addmatricula')
})

app.post('/matri/insertmatri', (req, res) =>{
    const nome = req.body.nome
    const cadastro = req.body.cadastro

    const sql = `INSERT INTO matri (nome, cadastro) VALUES ('${nome}', '${cadastro}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/addmatricula')
    })
})

app.get('/matri', (req,res) =>{
    const sql = ' SELECT * FROM matri'

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const matri = data
        console.log(matri)
        res.render('matri',{matri})

    })
})

app.get('/matri/:id', (req,res) =>{

    const id = req = req.params.id
    
    const sql = (`SELECT * FROM  matri where id =${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const matricula = data[0]

        res.render('matricula', {matricula})
    })
})

app.get('/matri/edit/:id', (req,res) =>{
    const id = req.params.id
    const sql = (`SELECT * FROM matri WHERE id = ${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const matricula = data[0]

        res.render('editmatricula', {matricula})
    })
})

app.post('/matri/updatematricula', (req, res) =>{

    const id = req.body.id
    const nome = req.body.nome
    const posicao = req.body.cadastro
    
    const sql = (`UPDATE matri SET nome = '${nome}', cadastro = '${cadastro}' WHERE  id = ${id}`)


    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/matri')
    })
})


app.post('/matri/remove/:id',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM matri WHERE id = ${id}`


    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/matri')
    })

})

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'matriculas_alunos'

})

app.get('/', (req, res) =>{

    res.render('home')
})

app.get('/planos', (req, res) =>{

    res.render('planos')
})

app.get('/profissionais', (req, res) =>{

    res.render('profissionais')
})

app.get('/unidades', (req, res) =>{

    res.render('unidades')
})

app.get('/suplemento', (req, res) =>{

    res.render('suplemento')
})

app.get('/matri', (req, res) =>{

    res.render('matri')
})
app.get('/formulario', (req, res) =>{

    res.render('formulario')
})
app.get('/login', (req, res) =>{

    res.render('login')
})

app.listen(3000, () =>{
    console.log('App rodando...')
})