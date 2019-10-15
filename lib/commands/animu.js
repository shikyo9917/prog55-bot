const request = require('request');
var parser = require('xml2js').parseString;
var Entities = require('html-entities').AllHtmlEntities;

entities = new Entities();
module.exports.run = function (args, e, manager) {
    request('https://api.jikan.moe/v3/search/anime?q='+args.join(' '), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parser(body, (err, result) => {
                if(err) throw err;
                var animu = result.anime.entry[0];

                e.message.channel.sendMessage([
                    '`Título:\t` **'+animu.title[0]+'**',
                    '`Link:\t` <https://myanimelist.net/anime/'+animu.id[0]+'>',
                    '`Episódios:\t` '+animu.episodes[0],
                    '`Score:\t`'+animu.score[0],
                    '`Tipo:\t`'+animu.type[0],
                    '`Status:\t`'+animu.status[0],
                    '`Início:\t`'+animu.start_date[0],
                    '`Fim:\t`'+animu.end_date[0],
                    '`Sinópse:\t`'+entities.decode(animu.synopsis[0].replace('<br />', '\n').replace('<br>', '\n')),
                    animu.image[0]
                ]);

            });
        }else if(!error && response.statusCode == 204){
            e.message.channel.sendMessage("Não achei nada sobre "+args.join(' '));
        }
    });
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Pesquisa um animu no MyAnimeList e mostra o primeiro resultado", "Uso: !animu <busca>"]);
}
