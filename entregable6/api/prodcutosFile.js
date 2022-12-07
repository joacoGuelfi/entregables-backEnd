const fs = require("fs").promises

class ProductosFile {
    constructor(path) {
        this.path = path
    }


    //METODOS
    async save(product) {
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            const data = JSON.parse(leer)
            let id
            data.length === 0
                ? (id = 1)
                : (id = data.length + 1)
            const newProduct = { ...product, id }
            data.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return (`Nuevo producto agregado con exito! ID: ${newProduct.id}`)
        } catch (error) {
            console.log(error)
        }

    }

    async getById(id) {
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            const data = JSON.parse(leer)
            let productFound = data.find(prod => prod.id === id)
            productFound === undefined ? productFound = null : productFound

            return (productFound)

        } catch (error) {
            console.log(error)
        }

    }

    async getAll() {
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            return JSON.parse(leer)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            const data = JSON.parse(leer)
            let productFound = data.find(prod => prod.id === id)
            let pos = data.indexOf(productFound)
            pos >= 0
                ? data.splice(pos, 1)
                : console.log("Producto no encontrado")
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return data

        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8")
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = ProductosFile