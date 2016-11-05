module.exports.run = function(args, e, manager) {
    if(manager.encoder){
        var encoder = manager.encoder;
        encoder.stop();
        encoder.destroy();
    }else{
        e.message.channel.sendMessage("Não há nada tocando.");
    }
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Para de tocar a linda canção", "Uso: !stop"]);
}
