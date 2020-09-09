const server = require('http').createServer();
const os = require('os-utils');

//Creating a socket.io and passing it http server
/*transposrts is used to inform the socket to send information immediately
and not wait around till the buffer is filled*/
const io = require('socket.io')(server,{
    transports:['websocket','polling']
});

// '.on' is used to listen to socket connection
io.on('conncetion',(client)=>{
    
    //set interval emits a cpuEvent every second
    setInterval(()=> {
        os.cpuUsage((cpuPercent) => {
            client.emit('cpu',cpuPercent)
        })
    },1000)
})

server.listen(3000);

