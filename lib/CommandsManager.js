/*
Command Manager automatically loads command scripts and run them
*/

class CommandsManager {
    constructor(db, client) {
        this.db = db;
        this.client = client;
        //Define aliases for comands
        //Format: "alias":"file"
        this.aliases = {};

        //cache for commands, saving on require() calls
        this.commands = {};
    }

    run(command, args, ev) {
        var cmd = this.resolve(command);
        if (cmd)
            try{
                cmd.run(args, ev, this);
            } catch(e){
                if (e.syntax){
                    cmd.usage(ev, this);
                }else{
                    console.log(e);
                }
            }
    }

    resolve(command) {
        var commandName = command
        if (this.aliases[command] !== undefined) {
            commandName = this.aliases[command];
        }
        var cmd = this.commands[commandName];
        if (cmd === 'notfound') {
            // Tried to fetch command earlier and failed, no need to try again
            return;
        }
        if (cmd === undefined) {
            try {
                cmd = require('./commands/' + command);
                this.commands[commandName] = cmd;
            } catch (e) {
                /* no comand found */
                console.log(e);
                this.commands[commandName] = 'notfound';
                return;
            }
        }
        return cmd;
    }
}

module.exports = CommandsManager;
