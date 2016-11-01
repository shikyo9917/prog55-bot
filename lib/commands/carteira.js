module.exports = function (args, e, manager) {
    const member = e.message.member;
    const channel = e.message.channel;
    manager.db.query("SELECT loli FROM bank WHERE name = $1", [member.mention], function (e, r) {
        if(e) throw e;

        if(r.rows.length == 0){
            var loli = 0;
        }else{
            var loli = r.rows[0].loli
        }

        channel.sendMessage(member.mention+", **você tem "+loli+" lolis**");
    });
}
