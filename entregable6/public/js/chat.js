const socket = io.connect()


function render(data) {

    const html = data.map(item => {
        return (`<div> <strong class:"chatAuthor">${item.author}</strong> <em class:"chatDate">[${item.date} / ${item.hour}]</em> : <em class:"chatText">${item.text}</em>`)
    }).join(" ")

    document.getElementById("message").innerHTML = html
}

function addMessage() {

    let d = new Date()
    let day = d.getDate()
    let month = d.getMonth()
    let year = d.getFullYear()
    let hours = d.getHours()
    let min = d.getMinutes()
    let seconds = d.getSeconds()
    let date = `${day}-${month + 1}-${year}`
    let time = `${hours}:${min}:${seconds}`

    const authorName = document.getElementById("author").value
    const textMsn = document.getElementById("text").value

    const mensaje = {
        author: authorName,
        text: textMsn,
        date: date,
        hour: time
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