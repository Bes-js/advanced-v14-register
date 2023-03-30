const {PermissionFlagsBits} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "yardım",
    usage:"yardım",
    aliases: ["help","yardm","helps"],
    execute: async (client, message, args, beş_embed) => {
    if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);

    let commandsFive = client.commands.filter(bes => bes.usage).map((fivesobes) => `> \`${beş_config.prefix}${fivesobes.usage}\``).join("\n");

     message.reply({ embeds: [beş_embed.setDescription(`${commandsFive}`).setThumbnail(message.guild.iconURL({dynamic:true})).setTitle(`Yardım Menüsü`).setURL(`https://linktr.ee/beykant`)] });

    }
}