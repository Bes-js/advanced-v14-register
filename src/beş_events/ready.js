const { joinVoiceChannel } = require("@discordjs/voice");
const client = global.client;
const db = client.db;
module.exports = () => {

let fiveVoiceChannel = db.get("five-channel-voice");
if(fiveVoiceChannel) {
const beş_kanal = client.channels.cache.get(fiveVoiceChannel);
if(!beş_kanal)return console.log(`${fiveVoiceChannel} ID'li Ses Kanal'ı Bulunamadı`)
joinVoiceChannel({
channelId: beş_kanal.id,
guildId: beş_kanal.guild.id,
adapterCreator: beş_kanal.guild.voiceAdapterCreator,
selfDeaf: true,
selfMute:true
});
}

}
module.exports.conf = {
name: "ready"
}