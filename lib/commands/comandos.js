module.exports.run = function (args, e, manager) {
    e.message.channel.sendMessage(':computer: Codigos de hacker (Adicione o "!" antes deles): ```\n ping \n bd \n bn \n cookie \n verdade \n cute \n carteira``` ');
}
module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Lista todas as minhas incríveis habilidades", "Uso: !comandos"]);
}
