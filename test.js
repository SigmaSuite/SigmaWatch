var WebSocketClient = require('websocket').client;
const EventEmitter = require('events');

async function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
}
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('connection', () => {
  console.log('Connected!');
});
myEmitter.on('connectionClose', () => {
    console.log('Stream is offline');
  });


function connect(){
const client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    connection.on('error', async function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', async function() {
        myEmitter.emit('connectionClose');
        await sleep(5000)
        return connect()
    });

    connection.on('message', function(message) {
        const msg = JSON.parse(message.utf8Data)
        if (msg.sdp?.type == "offer") {
            myEmitter.emit('connection');
        } 
      
    });
    
    async function sendOffer() {
        if (connection.connected) {
            sendMessage(connection, {
                command: 'request_offer'
            })
            await sleep(5000)
            sendOffer()
        }
    }

    sendOffer()
});
client.connect('ws://sigmasuite.ddns.net:3333/app/stream');
}

function sendMessage(connection, msg){
    return connection.send(JSON.stringify(msg))
}


async function test(){
    const time1 = Date.now()
    await sleep(5000)
    const time2 = Date.now()
    console.log(time2 - time1)
}
test()