const Container = require("./clases.js")
const products = new Container("./products.json")

async function ejecutar() {
    const product1 = {
        name: "Lata de atun",
        price: 300,
        thumbnail: "url"
    }
    const product2 = {
        name: "Pan",
        price: 300,
        thumbnail: "url"
    }
    const product3 = {
        name: "Mayonesa",
        price: 300,
        thumbnail: "url"
    }
    const product4 = {
        name: "Doritos",
        price: 300,
        thumbnail: "url"
    }

    await products.save(product1).then(data => console.log(data))
    await products.save(product2).then(data => console.log(data))
    await products.save(product3).then(data => console.log(data))
    await products.save(product4).then(data => console.log(data))
    //await products.getById(2).then(data => console.log(data))
    //await products.getAll().then(data => console.log(data))
    //await products.deleteById(5).then(data => console.log(data))
    //await products.deleteAll()

}

ejecutar()