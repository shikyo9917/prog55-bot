const LanguageBrain = require('../LanguageBrain');

var brain = new LanguageBrain('16e72fe8211449c2bdfac01bbb757bdb');


module.exports.run = function (args, e, manager) {
    brain.handle(args.join(' '), (error, resp) => {
        if(error){
            e.message.channel.sendMessage("Can't answer now");
            return;
        }

        if(resp.result.fulfillment){
            e.message.channel.sendMessage(resp.result.fulfillment.speech);
        }
    });
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Conversa com você", "Uso: !talk <frase>"]);
}
