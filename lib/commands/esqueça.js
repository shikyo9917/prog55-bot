module.exports = function (args, e, manager) {
    const db = manager.db;
    const channel = e.message.channel;
    const mention = e.message.author.mention;
    if(args[0] == 'tudo'){
        db.query("DELETE FROM reminders WHERE name = $1", [mention], function (err, result) {
            if(err){
                console.log(err);
                return;
            }

            channel.sendMessage("Esqueci todos os seus lembretes");
        });
    }else if(isNaN(args[0])){
        channel.sendMessage("Não entendi :persevere:");
    }else{
        var number = parseInt(args[0]);
        db.query("SELECT id FROM reminders WHERE name = $1", [mention], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }

            if(result.rows.length < number){
                channel.sendMessage("Não lembro desse...");
                return;
            }

            db.query("DELETE FROM reminders WHERE id = $1", [result.rows[number-1].id], function (err, result) {
                channel.sendMessage("Esqueci do lembrete "+number);
            });
        });
    }

}
