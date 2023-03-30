const {PermissionFlagsBits,ChannelType} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "say",
    usage:"say",
    aliases: ["sayy","says","bilgi"],
    execute: async (client, message, args, beş_embed) => {
    let tagData = await db.get("five-tags") || [];
    if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
    let aktif = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
    let uye = message.guild.memberCount
    let bot = message.guild.channels.cache.filter(channel => channel.type == ChannelType.GuildVoice).map(channel => channel.members.filter(member => member.user.bot).size).reduce((a, b) => a + b);
    let sesli = message.guild.members.cache.filter(x => !x.user.bot && x.voice.channel).size
    let boost = message.guild.premiumSubscriptionCount;
    
    message.reply({ embeds: [beş_embed.setDescription(`> **Sunucumuzda Toplam ${uye} Üye Bulunuyor!**\n> **Toplam ${aktif} Aktif Kişi Bulunuyor!**\n> **Toplam ${sesli} \`(+${bot} Bot)\` Kişi Seste Bulunuyor!**\n> **${boost} Adet Boost Bulunmakta!**${message.guild.members.cache.filter(u => tagData.some(bes => u.user.tag.includes(bes))).size > 0 ? `\n> **Toplam ${message.guild.members.cache.filter(u => tagData.some(bes => u.user.tag.includes(bes))).size} Taglı Üyemiz Bulunmakta!**`: ""}`).setThumbnail(message.guild.iconURL({dynamic:true})).setTitle(`İstatistik`).setURL(`https://linktr.ee/beykant`)] });
    }
}