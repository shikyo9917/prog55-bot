module.exports.run = function (args, e, manager) {
    ping = Date.now() - (new Date(e.message.timestamp)).getTime();
    e.message.channel.sendMessage('pong ('+ping+' ms)');
}
module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Uso: !ping"]);
}
