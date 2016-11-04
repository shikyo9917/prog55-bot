module.exports.run = function (args, e, manager) {
    e.message.channel.sendMessage('https://aww.moe/fy95x9.gif');
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Uso: !cute"]);
}
