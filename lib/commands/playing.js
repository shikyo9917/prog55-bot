module.exports.run = function(args, e, manager) {
    var player = manager.player;
    var msg = [];
    if(!player.playing && player.songs.length == 0){
        return e.message.channel.sendMessage("Não há nada tocando agora");
    }
    if(player.playing){
        msg.push("**TOCANDO**");
        msg.push("`Título:` "+player.current.info.title);
        msg.push("`Canal:` "+player.current.info.author);
        msg.push(" ");
    }
    msg.push("**FILA**");
    for (var i = 0; i < player.songs.length; i++) {
        msg.push("`Título:` "+player.songs[i].info.title);
        msg.push("`Canal:` "+player.songs[i].info.author);
        msg.push("**-----------------------------**");
    }
    e.message.channel.sendMessage(msg);
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Lista as músicas na fila e sendo tocada", "Uso: !next"]);
}
