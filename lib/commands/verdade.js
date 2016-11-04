module.exports.run = function (args, e, manager) {
    e.message.channel.sendMessage('Homem de verdade não fapa pra trap!');
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Verdades da vida", "Uso: !verdade"]);
}
