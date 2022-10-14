const url = `wss://localhost:6868`;
const server = new WebSocket(url)

const message = document.getElementById
('messages')

server.onopen = function(){
    server.send
}