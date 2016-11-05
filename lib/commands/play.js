const ytdl = require('ytdl-core');

module.exports.run = function(args, e, manager) {
    if (manager.encoder) {
        e.message.channel.sendMessage("Já estou tocando, espere acabar");
        return;
    }
    var client = manager.client;
    var voiceChannel = e.message.author.getVoiceChannel(e.message.guild);
    if(!voiceChannel){
        e.message.channel.sendMessage("Entre no canal de voz");
        return;
    }
    voiceChannel.join(false, true).then(function (info) {
        ytdl.getInfo(args[0], function(err, mediaInfo) {
            if (err) return e.message.channel.sendMessage("Url inválida");
            // sort by bitrate, high to low; prefer webm over anything else
            var formats = mediaInfo.formats.filter(f => f.container === "webm")
                .sort((a, b) => b.audioBitrate - a.audioBitrate);

            // get first audio-only format or fallback to non-dash video
            var bestaudio = formats.find(f => f.audioBitrate > 0 && !f.bitrate) ||
                formats.find(f => f.audioBitrate > 0);
            if (!bestaudio) return e.message.channel.sendMessage("Formato inválido");

            if (!info) info = client.VoiceConnections[0];
            if (!info) return console.log("[playRemote] Voice not connected");
            // note that in this case FFmpeg must also be compiled with HTTPS support
            var encoder = info.voiceConnection.createExternalEncoder({
                type: "ffmpeg",
                source: bestaudio.url
            });
            encoder.play();
            manager.encoder = encoder;
            encoder.once("end", () => {
                voiceChannel.leave();
                manager.encoder = null;
            });
            encoder.once("unpipe", () => {
                voiceChannel.leave();
                manager.encoder = null;
            });
        });
    }, function (err) {
        console.log(err);
        e.message.channel.sendMessage("Eu falhei");
    });
}
module.exports.usage = function(e, manager) {
    e.message.channel.sendMessage(["Toca uma linda canção", "Uso: !play <youtube_url>"]);
}
