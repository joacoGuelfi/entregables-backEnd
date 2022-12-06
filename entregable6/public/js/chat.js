const socket = io.conenct()

function render(data) {
    let date = getDate()
    let hours = setHours()
    const html = data.map(item => {
        return (`<div> <strong class:"chatAuthor">${item.author}</strong><strong class:"chatDate">${date} ${hours}</strong> :<p class:"chstText">${item.text}</p>`)
    }).join(" ")

    document.getElementById("message").innerHTML = html
}

function addMessage() {
    const authorName = document.getElementById("author").value
    const textMsn = document.getElementById("text").value

    const mensaje = {
        author: authorName,
        text: textMsn
    }

    //reseteamos el formulario
    document.getElementById("text").value = ""

    //data al server
    socket.emit("new-message", mensaje)

    return false
}

socket.on("message", data => {
    render(data)
})