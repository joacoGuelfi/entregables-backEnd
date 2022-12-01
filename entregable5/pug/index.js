const express = require("express")
const app = express()


app.set("views", "./views")
app.set("view engine", "pug")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const ProductosApi = require('./api/productos')
const productosApi = new ProductosApi()


app.get("/", (req, res) => {
    res.render("formulario")
})


app.post('/productos', (req, res) => {
    productosApi.add(req.body)


    res.redirect('/')
})


app.get('/productos', (req, res) => {
    let lista = productosApi.getAll()
    let tam
    if (lista.length > 0) {
        tam = true
    } else {
        tam = false
    }
    res.render("historial", { lista: lista, tam })
})








app.listen(8080, () => {
    console.log("Server 8080, utilizando pug")
})