module.exports.run = function (args, e, manager) {
    const member = e.message.author;
    const channel = e.message.channel;
    manager.db.query("SELECT loli FROM bank WHERE name = $1", [member.mention], function (e, r) {
        if(e) throw e;

        if(r.rows.length == 0){
            var loli = 0;
        }else{
            var loli = r.rows[0].loli
        }

        channel.sendMessage(member.mention+", **você tem "+loli+" lolis**");
    });
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Faz um extrato do seu baú de lolis", "Uso: !carteira"]);
}
