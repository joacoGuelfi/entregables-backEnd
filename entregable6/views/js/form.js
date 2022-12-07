const { response } = require("express")

const socketProd = io.connect()


const formProds = document.getElementById("formProds")
formProds.addEventListener("submit", e => {
    e.preventDefault()
    const prodName = document.getElementById("nombre").value
    const prodPrice = document.getElementById("precio").value
    const prodImg = document.getElementById("imagen").value
    const newProd = {
        nombre: prodName,
        precio: prodPrice,
        imagen: prodImg
    }
    socket.emit("prods", newProd)
})

socket.on("prods", data => {
    const html = data.map(item => {
        return (`
        <tr>
                <td style="vertical-align: middle;">${item.id}</td>
                <td style="vertical-align: middle;">${item.nombre}</td>
                <td style="vertical-align: middle;">${item.precio}</td>
                <td style="vertical-align: middle;"> <img style="height: 100px; width: 100px;"src=${item.imagen} alt=""></td>
         </tr>
        `)
    }).join(" ")
    makeHtml(html)
})

function makeHtml(prod) {
    return fetch("../historial.ejs")
        .then(response => response.text())
        .then(plantilla => {
            const template = ejs.compile(plantilla)
            const html = template({ prod })
            return html
        })
}







function render(data) {



    document.getElementById("prods").innerHTML = html
}



socket.on("prods", data => {
    render(data)
})