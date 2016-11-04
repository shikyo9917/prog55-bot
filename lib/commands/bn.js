module.exports.run = function (args, e, manager) {
    e.message.channel.sendMessage('Boa noite, anon-kun \n http://i.imgur.com/srJAUHs.gif');
}
module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Dê um beijo de boa noite em todos", "Uso: !bn"]);
}
