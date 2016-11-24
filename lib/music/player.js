const ytdl = require('ytdl-core');

class Player {
    constructor() {
        this.playing = false;
        this.channel = null;
        this.queue = [];
        this.current = null;
    }

    init(voiceChannel, callback) {
        if (!voiceChannel.joined) {
            voiceChannel.join(false, true).then(callback);
        }
        if (this.channel == null || this.channel.channelId != voiceChannel.channelId) {
            if (this.channel != null) {
                this.channel.leave();
            }
            this.channel = voiceChannel;
        }
    }

    play(url, voiceChannel) {
        if (this.channel == null) {
            this.init(voiceChannel, (info) => start(url, info));
            this.current = url;
        } else if (playing) {
            add(url);
        } else {
            playSong(this.channel.getVoiceConnectionInfo());
        }
    }

    start(url, info) {
        ytdl.getInfo(url, function(err, mediaInfo) {
            if (err) return e.message.channel.sendMessage("Url inválida");
            // sort by bitrate, high to low; prefer webm over anything else
            var formats = mediaInfo.formats.filter(f => f.container === "webm")
                .sort((a, b) => b.audioBitrate - a.audioBitrate);
estaudio) return e.message.channel.sendMessage("Formato inválido");

            if (!info) info = client.VoiceConnections[0];
            if (!info) return console.log("[playRemote] Voice not connected");
            // note that in this case FFmpeg must also be compiled with HTTPS support
            var encoder = info.voiceConnection.createExternalEncoder({
                type: "ffmpeg",
                source: bestaudio.url
            });
            this.playing = true;
            encoder.play();
            this.encoder = encoder;
            encoder.once("end", () => {
                this.playing = false;
                if (!next()) {
                    this.end();
                }
            });
            encoder.once("unpipe", () => {
                this.end();
            });
        });
    }

    add(url){
        this.queue.push(url);
    }

    next(){
        if(this.queue.length  == 0){
            return false;
        }
        if(this.isOnVoiceChannel()){
            this.start(this.queue.shift(), this.channel.getVoiceConnectionInfo());
            return true;
        }

        return false;
    }

    stop(){
        this.playing = false;
        encoder.stop();
        encoder.destroy();
    }

    end() {
        if (this.channel != null) {
            this.channel.leave();
        }
        this.encoder = null;
        this.playing = false;
    }

    isOnVoiceChannel(){
        return this.channel && this.channel.joined;
    }

    get queueSize(){
        return this.queue.length;
    }

}
