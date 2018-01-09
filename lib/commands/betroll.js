var dbUtils = require('../utils/db');

module.exports.run = function (args, e, manager) {
    const member = e.message.author;
    const guild = e.message.guild;
    var channel = e.message.channel;

    if(!e.message.isPrivate){
        channel = guild.textChannels.find(c => c.name == "casino");
    }

    var bet = parseInt(args[0]);
    if(isNaN(bet) || bet <= 0){
        throw {syntax: true};
    }

    dbUtils.check(manager.db, member.mention, bet, (result) => {
        if(!result){
            channel.sendMessage("Você não tem lolis o suficiente");
            return;
        }

        var numero1 = Math.floor((Math.random() * 10) + 1);
        var numero2 = Math.floor((Math.random() * 10) + 1);
        var numero3 = Math.floor((Math.random() * 10) + 1);
        if (numero1 == numero2 && numero2 == numero3) {
            channel.sendMessage("**##### Hora de checar! #####** \n Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + "\n ##### GET! ##### \n "+ member.mention + ", você ganhou: "+(bet*100)+" lolis");
            dbUtils.save(manager.db, member.mention, bet*5);
            return
        }
        if (numero1 == numero2 || numero2 == numero3 || numero1 == numero3) {
            channel.sendMessage("**##### Hora de checar! #####** \n Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + " \n ##### Duplos, Parábens! ##### \n " + member.mention + ", você ganhou: "+(bet*45)+" lolis");
            dbUtils.save(manager.db, member.mention, bet*2);
        } else {
            channel.sendMessage("**##### Hora de checar! #####** \n Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + " \n " + member.mention + ", não foi dessa vez, você perdeu "+bet+" lolis");
            dbUtils.save(manager.db, member.mention, -bet);
        }

    });
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Role os dados apostando suas lolis", "Uso: !betroll <lolis>"]);
}
