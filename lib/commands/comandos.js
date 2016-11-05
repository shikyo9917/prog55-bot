const fs = require('fs');

module.exports.run = function (args, e, manager) {
    var commands = [':computer: Codigos de hacker (Adicione o "!" antes deles):', ' ```']
    fs.readdir(__dirname, (err, files) => {
        files.forEach(file => {
            commands.push(file.replace('.js', ''));
        });
        commands.push('```');
        e.message.channel.sendMessage(commands);
    });
}
module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Lista todas as minhas incríveis habilidades", "Uso: !comandos"]);
}
