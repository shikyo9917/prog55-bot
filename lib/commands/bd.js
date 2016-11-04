module.exports.run = function (args, e, manager) {
    e.message.channel.sendMessage('Ohayo :3, @everyone');
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Deseje um bom dia aos seus queridos amigos", "Uso: !bd"]);
}
