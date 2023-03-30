const {PermissionFlagsBits} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "kullanıcı-bilgi",
    usage:"kullanıcı-bilgi [@Beş / ID]",
    aliases: ["kbilgi","kb","kullanıcıbilgi","info","inf"],
    execute: async (client, message, args, beş_embed) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
       
    
        message.reply({ embeds: [beş_embed.setDescription(
      `**
      • Kullanıcı: (<@${member.id}> - \`${member.id}\`) (${member.roles.highest})
      • Sunucuya Katılım Sırası: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
      • Hesap Kuruluş: <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)
      • Sunucuya Katılım: <t:${Math.floor(member.joinedAt / 1000)}> (<t:${Math.floor(member.joinedAt / 1000)}:R>)
      • Rolleri: ${(member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Üzerinde Hiç Rol Bulunmamakta!')}
      • Avatar: [Tıkla](${member.user.avatarURL({dynamic:true})})**
      `).setThumbnail(member.user.avatarURL({dynamic:true})).setTitle(`${member.user.tag} Bilgileri`).setImage(message.guild.bannerURL({dynamic:true,size: 4096})).setURL(`https://linktr.ee/beykant`)] });
    }
}