const socket = io()

let name;
const textArea = document.querySelector("#textarea")
let messageArea = document.querySelector(".message-section")
do {
    name = prompt("Please Enter your name:")
} while (!name)

textArea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }
    appendMessage(msg, "outgoing")
    textArea.value = ""

    scrollToBottom()
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, "msg")

    let markup = `
   <h4>${msg.user}</h4>
   <p>${msg.message}</p>
   `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)

}

socket.on("message", (msg) => {
//    console.log(msg)
   appendMessage(msg, 'incoming')
   scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}