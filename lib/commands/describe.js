const request = require('request');
module.exports.run = function(args, e, manager) {
    var bodyObj = {
        url: args[0]
    };
    var r = request({
        url: 'https://api.projectoxford.ai/vision/v1.0/describe?maxCandidates=1',
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': 'c2035dc6885f4e57aa9ab5605719de15'
        },
        json: true,
        body: bodyObj
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var caption = body.description.captions[0].text;
            e.message.channel.sendMessage(caption);
        } else {
            console.log(response);
            e.message.channel.sendMessage("Sinto muito! Estou sem meus óculos.")
        }
    });
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage("Descreve uma imagem");
    e.message.channel.sendMessage("Uso: !describe <img-url>");
}
