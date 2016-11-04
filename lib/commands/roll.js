var dbUtils = require('../utils/db');

module.exports.run = function (args, e, manager) {
    const member = e.message.author;
    const guild = e.message.guild;
    var channel = e.message.channel;
    if(!e.message.isPrivate){
        channel = guild.textChannels.find(c => c.name == "casino");
    }
    dbUtils.save(manager.db, member.mention, 5);
    var numero1 = Math.floor((Math.random() * 10) + 1)
    var numero2 = Math.floor((Math.random() * 10) + 1)
    var numero3 = Math.floor((Math.random() * 10) + 1)
    if (numero1 == numero2 || numero2 == numero3 || numero1 == numero3) {
        channel.sendMessage("**##### Hora de checar! #####** \n Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + " \n ##### Duplos, Parábens! ##### \n " + member.mention + ", você ganhou: 45 lolis");
        dbUtils.save(manager.db, member.mention, 45);
    } else {
        channel.sendMessage("**##### Hora de checar! #####** \n Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + " \n " + member.mention + ", não foi dessa vez, tente de novo!");
    }
    if (numero1 == numero2 && numero2 == numero3) {
        channel.sendMessage("**##### Hora de checar! #####** \n Seus numeros foram: " + numero1 + " - " + numero2 + " - " + numero3 + "\n ##### GET! ##### \n "+ member.mention + ", você ganhou: 100 lolis");
        dbUtils.save(manager.db, member.mention, 100);
    }
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Role os dados e ganhe lolis", "Uso: !roll"]);
}
