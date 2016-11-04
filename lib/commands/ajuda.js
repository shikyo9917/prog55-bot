module.exports.run = function(args, e, manager) {
    if(args.length == 0){
        manager.resolve('comandos').run([], e, manager);
        return;
    }

    if(args.length > 1){
        manager.resolve('ajuda').usage(e, manager);
        return;
    }
    var command = manager.resolve(args[0]);
    if(command){
        command.usage(e, manager)
    }else{
        e.message.channel.sendMessage("Esse comando não existe");
    }
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage("Uso: !ajuda <comando>");
}
