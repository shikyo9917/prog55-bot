const ytdl = require('ytdl-core');

class Player {
    constructor() {
        this.songs = [];
        this.current = null;
        this.channel = null;
    }

    get isOnVoiceChannel() {
        return this.channel != null && this.channel.joined;
    }
    get playing() {
        return this.current != null;
    }

    joinVoice(voiceChannel, callback, failCallback) {
        if (!this.isOnVoiceChannel) {
            if(voiceChannel == null){
                failCallback(null);
            }
            voiceChannel.join(false, true).then((info) => {
                this.channel = voiceChannel;
                callback(info);
            }, (err) => {
                failCallback(err)
            });
        } else {
            return callback(voiceChannel.getVoiceConnectionInfo());
        }

    }

    leaveVoice(){
        if(this.channel != null){
            this.channel.leave();
            this.channel = null;
        }
    }

    play(song) {
        if (!this.isOnVoiceChannel) {
            return;
        }
        var encoder = this.channel.getVoiceConnectionInfo().voiceConnection.createExternalEncoder({
            type: "ffmpeg",
            source: song.format.url
        });

        encoder.play();
        this.current = song;
        this.current.encoder = encoder;
        encoder.once("end", () => {
            encoder.destroy();
            if (this.hasNext) {
                play(this.songs.shift())
            } else {
                this.current = null;
                this.channel.leave();
                this.channel = null;
            }
        });
        encoder.once("unpipe", () => {
            encoder.destroy();
        });
    }

    add(url, callback, errCallback) {
        ytdl.getInfo(url, (err, mediaInfo) => {
            if (err) return errCallback("Url inválida", err);
            // sort by bitrate, high to low; prefer webm over anything else
            var formats = mediaInfo.formats.filter(f => f.container === "webm")
                .sort((a, b) => b.audioBitrate - a.audioBitrate);

            // get first audio-only format or fallback to non-dash video
            var bestaudio = formats.find(f => f.audioBitrate > 0 && !f.bitrate) ||
                formats.find(f => f.audioBitrate > 0);
            if (!bestaudio) return errCallback("Formato inválido");
            this.songs.push({
                url: url,
                info: mediaInfo,
                format: bestaudio,
            });

            if (callback) {
                callback();
            }
        });
    }

    stop() {
        if (this.playing) {
            this.current.encoder.stop();
            this.current.encoder.destroy();
            this.current = null;
        }
    }

    get hasNext() {
        return this.songs.length > 0;
    }

    next() {
        if (this.hasNext) {
            if (this.playing) {
                this.stop();
            }
            this.play(this.songs.shift());
        }
    }

    clear() {
        this.songs = [];
    }
}

module.exports = Player;
