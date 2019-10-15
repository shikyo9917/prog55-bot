var http = require('http')
var Discordie = require("discordie");
var env = require('node-env-file');
var pg = require('pg');
var Player = require("./lib/music/player");
var CommandsManager = require('./lib/CommandsManager')
var client = new Discordie();
var player = new Player();


env(__dirname+'/.env', {raise: false});
pg.defaults.ssl = true;
var db = new pg.Client(process.env.DATABASE_URL);

var manager = new CommandsManager(db, client);
manager.player = player;

//cria a tabela caso não exista
db.connect(function(err) {
    if (err) throw err;
    //Initialize the db tables
    db.query("CREATE TABLE IF NOT EXISTS bank (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, loli INT NOT NULL)", function(err, result) {
        if (err) throw err;
    });

    db.query("CREATE TABLE IF NOT EXISTS reminders (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, reminder TEXT NOT NULL)", function(err, result) {
        if (err) throw err;
    });
});

// http.createServer(function (request, response) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello World\n");
// }).listen(process.env.PORT);
//
// setInterval(function () {
//     http.get("http://prog55-bot.herokuapp.com");
// }, 60000);
client.autoReconnect.enable();
client.connect({
    token: process.env.DISCORD_KEY
});

client.Dispatcher.on("GATEWAY_READY", e => {
    console.log("Connected as: " + client.User.username);
    // setPolling();
});

client.Dispatcher.on("DISCONNECTED", (err, ar, delay) => {
    console.log("Disconnected");
    console.log(err.message);
    if(ar){
        console.log("Reconnecting...");
    }
});

function setPolling() {
    pollingHandler = setInterval(function () {
        console.log("Acorda Heroku!");
    }, 300000);
}

function endPolling() {
    clearInterval(pollingHandler);
}

function resetPolling() {
    endPolling();
    setPolling();
}

var prefix = 'k!'
client.Dispatcher.on("MESSAGE_CREATE", e => {
    //reset polling since heroku is active
    // resetPolling();

    let args = e.message.content.replace(prefix, '').split(/\s+/);
    const command = args.shift();
    if(e.message.content[0] == prefix){
        manager.run(command, args, e);
    }else if(client.User.isMentioned(e.message, true)){
        manager.run('talk', args, e);
    }else if (e.message.content == ':3')
        e.message.channel.sendMessage('>:3');
    else if (e.message.content == 'Bu')
        e.message.channel.sendMessage('Que susto :ghost:');
});
