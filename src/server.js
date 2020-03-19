const express = require('express') //chamando o express
const nunjucks = require('nunjucks') //chamando engine nunjucks
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express() //iniciando um servidor com o express

server.use(express.urlencoded ({ extended: true})) //ira ativar a funcionalidade req body
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)


server.set("view engine", "njk")

nunjucks.configure("src/app/views", { //configurando o caminho das views
    express: server,
    autoescape: false,
    noCache: true
})


server.listen(5000, function () { //definindo qual porta o servidores vai ficar "ouvindo"
    console.log("server is running")
})  