const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { json } = require('body-parser')
const app = express()


const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
})

sql.query("use sa1")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + "/"))
app.use(express.static(__dirname + "/_css"))
app.use(express.static(__dirname + "/_js"))
app.use(express.static(__dirname + "/_media"))
app.use(express.static(__dirname + "/_img"))

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))

app.get('/carrossel/:id?', (req, res)=>{
    res.sendFile(`${__dirname}/${req.params.id}.html`)
})

app.post('/busca', (req, res) => {
    var busca = req.body.busca
    busca = busca.toLowerCase()
    sql.query(`select caminho from song where name = "${busca}"`, (err, results, filds) => {
        var path = results[0].caminho
        res.redirect(`/${path}`)
    })
})
    
app.post('/email', (req, res) => {
    sql.query("insert into user values (?, ?)", [ , req.body.news])
    res.redirect('/')
})

app.listen(8081, () => console.log('Server ON!'))