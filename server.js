const express = require("express")
const app = express()
const http = require("http").createServer(app)
const PORT = 8000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // console.log("ok")
    res.sendFile(__dirname + '/index.html')
})
http.listen(PORT, () => {
    console.log(`listening port on ${PORT}`)
})
const io = require("socket.io")(http)
io.on("connection", (socket) => {
    console.log("connected")
    socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg) 

    })
})