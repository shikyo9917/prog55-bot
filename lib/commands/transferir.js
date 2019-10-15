var dbUtils = require('../utils/db');

module.exports.run = function(args, e, manager) {
    const member = e.message.author;
    const guild = e.message.guild;
    const name = args[0];
    var channel = e.message.channel;
    if(!e.message.isPrivate){
        channel = guild.textChannels.find(c => c.name.includes("cassino"));
    }
    var lolis = args[1];
    if(isNaN(lolis)){
        channel.sendMessage("Não entendi :persevere:");
        return;
    }
    if(parseInt(lolis) < 0){
        channel.sendMessage("Boa tentativa :smirk:");
        return;
    }
    if(member.mention == name){
        channel.sendMessage("Você não pode transferir para si mesmo");
        return;
    }
    if (lolis != null) {
        dbUtils.trans(manager.db, member.mention, name, parseInt(lolis), function (success) {
            if (success) {
                channel.sendMessage(name+", "+member.mention+" te enviou "+lolis+" lolis :3");
            }else{
                channel.sendMessage("Lolis insuficientes!");
            }
        });
    } else {
        channel.sendMessage("informe um valor!")
    }
}

module.exports.usage = function (e, manager) {
    e.message.channel.sendMessage(["Transfira lolis para alguém", "Uso: !transferir <pessoa> <valor>"]);
}
