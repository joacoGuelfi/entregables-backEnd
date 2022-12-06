const express = require('express')
const { Server: HttpServer } = require("http")
const { Server: IO } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))


app.set('views', './views')
app.set('view engine', 'ejs')

const ProductosApi = require('./api/productos')
const productosApi = new ProductosApi()
const prods = productosApi.getAll()

const PORT = 8070

const messages = [
    { author: "Servidor", text: "Bienvenidos" },
]


app.get('/', (req, res) => {
    res.render('inicio', { prods })
})

app.post('/', (req, res) => {
    productosApi.add(req.body)


    res.redirect('/')
})



//Hanshake
io.on("connection", socket => {
    console.log("Nuevo cliente conectado")

    //Historial
    socket.emit("message", messages)

    //Escuchamos cliente
    socket.on("new-message", data => {
        messages.push(data)

        //mostramos el nuevo mensaje a todos los clientes conectados
        io.sockets.emit("message", messages)
    })

})

httpServer.listen(PORT, () => {
    console.log(`server OK, desde puerto ${PORT}`);
})
