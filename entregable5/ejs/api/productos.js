const fs = require("fs").promises
class ProductosApi {
    constructor() {
        this.productos = []
        this.id = 0
    }
    //METODOS

    add(prod) {
        const id = (this.productos.length + 1)
        const newProd = { ...prod, id }
        this.productos.push(newProd)
        return id
    }

    getAll() {
        return (this.productos)
    }

    getById(id) {
        try {
            const prodFind = this.productos.find(prod => prod.id === id)
            prodFind === undefined ? prodFind = null : prodFind
            return (prodFind)
        }
        catch (error) {
            return ({ error: "producto no encotrado" })
        }
    }

    updateById(prod, id) {
        const prodFind = this.productos.find(prod => prod.id === id)
        const pos = this.productos.indexOf(prodFind)
        this.productos.splice(pos, 1)
        const newProd = { ...prod, id }
        this.productos.push(newProd)
    }

    deleteById(id) {
        const prodDel = this.productos.find(prod => prod.id === id)
        const pos = this.productos.indexOf(prodDel)
        this.productos.splice(pos, 1)
    }
}


module.exports = ProductosApi