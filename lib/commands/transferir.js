var dbUtils = require('../utils/db');

module.exports = function (args, e, manager) {
  const member = e.message.member;
  const guild = e.message.guild;
  const name = args[0];
  const channel = guild.textChannels.find(c => c.name == "casino");
  var lolis = args[1].lolis;
  if (lolis != null) {
  if(!dbUtils.trans(manager.db, name, member.mention, lolis)){
    channel.sendMessage("Lolis insuficientes!");
  }else{
  channel.sendMessage("informe um valor!")
  }
}
