module.exports.run = function (args, e, manager) {
    e.message.channel.sendMessage('pong');
}
module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Uso: !ping"]);
}
