const request = require('request');

module.exports.run = function (args, e, manager) {
  request('https://api.jikan.moe/v3/search/anime?q='+args.join(" "), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const result = JSON.parse(body)
                var animu = result.results[0];
                e.message.channel.sendMessage([
                    '`Título:\t` **'+animu.title+'**',
                    '`Link:\t` <https://myanimelist.net/anime/'+animu.mal_id+'>',
                    '`Episódios:\t` '+animu.episodes,
                    '`Score:\t`'+animu.score,
                    '`Tipo:\t`'+animu.type,
                    '`Lançando:\t`'+animu.airing,
                    '`Início:\t`'+animu.start_date,
                    '`Fim:\t`'+animu.end_date,
                    '`Sinópse:\t`'+animu.synopsis,
                    animu.image_url
                ]);
            
        }else if(!error && response.statusCode == 204){
            console.log("Não achei nada");
        }
    });
}

module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Pesquisa um animu no MyAnimeList e mostra o primeiro resultado", "Uso: !animu <busca>"]);
}
