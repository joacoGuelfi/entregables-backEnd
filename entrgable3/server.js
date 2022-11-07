const Container = require("../enrtegable2/clases");
const prodcutos = new Container("../enrtegable2/products.json")
const express = require("express");

const app = express()
const PORT = 8080


app.get("/productos", async (req, res) => {
    const prods = await prodcutos.getAll()
    res.send({ Productos: prods })

})

app.get("/productoRandom", async (req, res) => {
    const prods = await prodcutos.getAll()
    const random = parseInt(Math.random() * prods.length)
    console.log(random)
    res.send({ ProductoRandom: prods[random] })
})

// CONFIG DE PUERTO
const server = app.listen(PORT, () => {
    console.log(`Server express recibiendo desde ${PORT}`)
})