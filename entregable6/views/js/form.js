const socketProd = io.connect()

function render(data) {

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

    document.getElementById("prods").innerHTML = html
}


function addProd() {

    const prodName = document.getElementById("nombre").value
    const prodPrice = document.getElementById("precio").value
    const prodImg = document.getElementById("imagen").value

    const newProd = {
        nombre: prodName,
        precio: prodPrice,
        imagen: prodImg
    }

    //data al server
    socket.emit("new-prod", newProd)
    return false
}
socket.on("prods", data => {
    render(data)
})