module.exports.run = function(args, e, manager) {
    var player = manager.player;
    if(player.hasNext){
        player.next();
    }else{
        e.message.channel.sendMessage("Não há músicas na fila");
    }
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Toca uma linda melodia", "Uso: !play <youtube_url>"]);
}
