module.exports.run = function(args, e, manager) {
    const mention = e.message.author.mention;
    const channel = e.message.channel;
    manager.db.query("SELECT reminder FROM reminders WHERE name = $1", [mention], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if(result.rows.length == 0){
            channel.sendMessage("Que lembretes?");
            return;
        }
        var messages = ['Aqui estão os seus lembretes, '+mention+':'];
        for (var i = 0; i < result.rows.length; i++) {
            messages.push((i+1)+'. '+result.rows[i].reminder);
        }
        channel.sendMessage(messages);
    });
}
module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Mostra todos os lembretes salvos", "Uso: !lembretes"]);
}
