const apiai = require('apiai');

class LanguageBrain {
    constructor(apiKey) {
        this.api = apiai(apiKey);
        this.apiKey = apiKey;
    }

    handle(message, callback){
        var req = this.api.textRequest(message, {sessionId: "abcdef"});
        req.on('response', (response) => {
            callback(null, response);
        });

        req.on('error',(error) => {
            callback(error, response);
        })

        req.end();
    }
}

module.exports = LanguageBrain;
