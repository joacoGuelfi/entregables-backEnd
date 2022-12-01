const express = require("express")
const handlebars = require("express-handlebars")

const app = express()

app.engine("hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    }))

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const ProductosApi = require('./api/productos')
const productosApi = new ProductosApi()

app.get("/", (req, res) => {
    res.render("main")
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
    res.render("productos", { lista: lista, tam })
})


/*const list = productosApi.getAll()
res.render("main", { productList: list, listExists: true })*/









app.listen(8080, () => {
    console.log("Server 8080, utilizando handlebars")
})