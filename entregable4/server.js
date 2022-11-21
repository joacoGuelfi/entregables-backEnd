const express = require('express')
const { Router } = express
const ProductosApi = require('./container/productos.js')

// router de productos

const productosApi = new ProductosApi()

const router = new Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

//rutas usando productosRouter
router.get("/", (req, res) => {
    res.send(productosApi.getAll())
})
router.post("/", (req, res) => {
    const id = productosApi.add(req.body)
    res.send(`Producto agregado. Nuevo ID: ${id}`)
})
router.get("/:id", (req, res) => {
    res.send(productosApi.getById(parseInt(req.params.id)))
})
router.delete("/:id", (req, res) => {
    productosApi.deleteById(parseInt(req.params.id))
    res.send("Producto eliminado")
})
router.put("/:id", (req, res) => {
    productosApi.updateById(req.body, req.params.id)
    res.send("Producto modificado con exito.")
})

// servidor

const app = express()
app.use(express.static('public'))
app.use('/api/productos', router)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))