const express = require('express')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('views', './views')
app.set('view engine', 'ejs')

const ProductosApi = require('./api/productos')
const productosApi = new ProductosApi()
const prods = productosApi.getAll()

const PORT = 8070


app.get('/', (req, res) => {
    res.render('inicio')
})

app.post('/productos', (req, res) => {
    productosApi.add(req.body)


    res.redirect('/')
})
app.get('/productos', (req, res) => {
    res.render('prods', { prods })
})

app.listen(PORT, () => {
    console.log('server OK!!');
})