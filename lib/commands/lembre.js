module.exports.run = function (args, e, manager) {
    // console.log(e.message);
    const db = manager.db;
    const mention = e.message.author.mention;
    const channel = e.message.channel;
    var reminder = args.join(' ');

    db.query("INSERT INTO reminders(name, reminder) VALUES($1, $2)", [mention, reminder], function (err, result) {
        if (err){
            console.log(err);
            return;
        }
        channel.sendMessage("Vou lembrar para você, "+mention);
    });
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Salva um lembrete", "Uso: !lembrete <lembrete>"]);
}
