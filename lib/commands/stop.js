module.exports.run = function(args, e, manager) {
    var player = manager.player;
    if(player.playing){
        player.stop();
        player.leaveVoice();
        player.clear();
    }else{
        e.message.channel.sendMessage("Não há nada tocando")
    }
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Para de tocar a melodia", "Uso: !stop"]);
}
