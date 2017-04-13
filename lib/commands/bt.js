module.exports.run = function (args, e, manager) {
    const member = e.message.author;
    e.message.channel.sendMessage(member.mention + ' dá boa tarde à todos :3, @everyone');
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Deseje uma boa tarde aos seus queridos amigos", "Uso: !bt"]);
}
