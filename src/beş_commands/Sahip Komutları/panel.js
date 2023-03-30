const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits, SelectMenuBuilder, ActivityType, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");
const db = client.db;
const beş_config = require("../../../beş_config")
const { codeBlock } = require("@discordjs/formatters");
module.exports = {
    name: "panel",
    aliases: ["setup"],
    execute: async (client, message, args, beş_embed) => {
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
        let secim = args[0];
        const beş_buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("welcome_image")
                    .setLabel(`Resimli Welcome`)
                    .setEmoji(`${db.has("five-welcome-image") ? "<:five_true:882380542513913886>" : "<:five_false:882380473551192096>"}`)
                    .setStyle(db.has("five-welcome-image") ? ButtonStyle.Success : ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("tag_mode")
                    .setLabel(`Taglı Alım`)
                    .setEmoji(`${db.has("five-welcome-tagmode") ? "<:five_true:882380542513913886>" : "<:five_false:882380473551192096>"}`)
                    .setStyle(db.has("five-welcome-tagmode") ? ButtonStyle.Success : ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("welcome_mentions")
                    .setLabel(`Rol Etiket`)
                    .setEmoji(`${db.has("five-welcome-mentions") ? "<:five_true:882380542513913886>" : "<:five_false:882380473551192096>"}`)
                    .setStyle(db.has("five-welcome-mentions") ? ButtonStyle.Success : ButtonStyle.Danger)
            );

        const beş_buttons_two = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Kurulum Hakkında Bilmeniz Gerekenler`)
                    .setEmoji(`ℹ️`)
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://github.com/Bes-js/advanced-v14-register")
            )



        let staffData = await db.get("five-register-staff") || [];
        let manRoles = await db.get("five-man-roles") || [];
        let womanRoles = await db.get("five-woman-roles") || [];
        let unregisterRoles = await db.get("five-unregister-roles") || [];
        let jailRoles = await db.get("five-jail-roles") || [];
        let familyRoles = await db.get("five-family-roles") || [];
        let tagData = await db.get("five-tags") || [];
        let chatChannel = await db.get("five-channel-chat");
        let welcomeChannel = await db.get("five-channel-welcome");
        let voiceChannel = await db.get("five-channel-voice");
        let logChannel = await db.get("five-channel-log");

        beş_embed.setDescription(`
**Kayıt Yetkilileri \`ID: 1\`**
${staffData.length > 0 ? staffData.map((bes) => `<@&${bes}>`).join(",") : "Bulunmamakta"}
**Erkek Rolleri \`ID: 2\`**
${manRoles.length > 0 ? manRoles.map((bes) => `<@&${bes}>`).join(",") : "Bulunmamakta"}
**Kadın Rolleri \`ID: 3\`**
${womanRoles.length > 0 ? womanRoles.map((bes) => `<@&${bes}>`).join(",") : "Bulunmamakta"}
**Kayıtsız Rolleri \`ID: 4\`**
${unregisterRoles.length > 0 ? unregisterRoles.map((bes) => `<@&${bes}>`).join(",") : "Bulunmamakta"}
**Jail Rolleri \`ID: 5\`**
${jailRoles.length > 0 ? jailRoles.map((bes) => `<@&${bes}>`).join(",") : "Bulunmamakta"}
**Family/Taglı Rolleri \`ID: 6\`**
${familyRoles.length > 0 ? familyRoles.map((bes) => `<@&${bes}>`).join(",") : "Bulunmamakta"}
**Taglar \`ID: 7\`**
${tagData.length > 0 ? tagData.map((bes) => `${bes}`).join(",") : "Bulunmamakta"}
**Genel Chat Kanalı \`ID: 8\`**
${chatChannel ? `<#${chatChannel}>` : "Bulunmamakta"}
**Hoşgeldin Kanalı \`ID: 9\`**
${welcomeChannel ? `<#${welcomeChannel}>` : "Bulunmamakta"}
**Bot Ses Kanalı \`ID: 10\`**
${voiceChannel ? `<#${voiceChannel}>` : "Bulunmamakta"}
**Tag Log Kanalı \`ID: 11\`**
${logChannel ? `<#${logChannel}>` : "Bulunmamakta"}

${codeBlock("diff", `
${db.has("five-welcome-image") ? "+" : "-"} Canvaslı / Resimli Hoşgeldin; ${db.has("five-welcome-image") ? "✅ " : "❌ "}
${db.has("five-welcome-tagmode") ? "+" : "-"} Taglı Alım; ${db.has("five-welcome-tagmode") ? "✅ " : "❌ "}
${db.has("five-welcome-mentions") ? "+" : "-"} Welcome Rol Etiket; ${db.has("five-welcome-mentions") ? "✅ " : "❌ "}
--- Bot Ping; ${Math.round(client.ws.ping)} MS | Mesaj Ping; ${(Date.now() - message.createdAt)} MS
`)}
`).setThumbnail(message.guild.iconURL({ forceStatic: true }))

        if (!secim) return message.reply({ components: [beş_buttons, beş_buttons_two], embeds: [beş_embed] })

        if (secim == "1") {
            let roles = message.mentions.roles.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-register-staff")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!roles) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 1 @rol**` })
            if (staffData.some(bes => bes.includes(roles.id))) {
                db.pull("five-register-staff", (eleman, sıra, array) => eleman == roles.id, true)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} Rolü Başarıyla Kaldırıldı!**` })
            } else {
                db.push("five-register-staff", roles.id)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} (\`${roles.name}\`) Rolü Başarıyla Eklendi!**` })
            }

        } else if (secim == "2") {
            let roles = message.mentions.roles.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-man-roles")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!roles) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 1 @rol**` })
            if (manRoles.some(bes => bes.includes(roles.id))) {
                db.pull("five-man-roles", (eleman, sıra, array) => eleman == roles.id, true)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} Rolü Başarıyla Kaldırıldı!**` })
            } else {
                db.push("five-man-roles", roles.id)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} (\`${roles.name}\`) Rolü Başarıyla Eklendi!**` })
            }

        } else if (secim == "3") {
            let roles = message.mentions.roles.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-woman-roles")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!roles) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 3 @rol**` })
            if (womanRoles.some(bes => bes.includes(roles.id))) {
                db.pull("five-woman-roles", (eleman, sıra, array) => eleman == roles.id, true)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} Rolü Başarıyla Kaldırıldı!**` })
            } else {
                db.push("five-woman-roles", roles.id)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} (\`${roles.name}\`) Rolü Başarıyla Eklendi!**` })
            }

        } else if (secim == "4") {
            let roles = message.mentions.roles.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-unregister-roles")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!roles) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 4 @rol**` })
            if (unregisterRoles.some(bes => bes.includes(roles.id))) {
                db.pull("five-unregister-roles", (eleman, sıra, array) => eleman == roles.id, true)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} Rolü Başarıyla Kaldırıldı!**` })
            } else {
                db.push("five-unregister-roles",roles.id)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} (\`${roles.name}\`) Rolü Başarıyla Eklendi!**` })
            }

        } else if (secim == "5") {
            let roles = message.mentions.roles.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-jail-roles")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!roles) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 5 @rol**` })
            if (jailRoles.some(bes => bes.includes(roles.id))) {
                db.pull("five-jail-roles", (eleman, sıra, array) => eleman == roles.id, true)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} Rolü Başarıyla Kaldırıldı!**` })
            } else {
                db.push("five-jail-roles", roles.id)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} (\`${roles.name}\`) Rolü Başarıyla Eklendi!**` })
            }

        } else if (secim == "6") {
            let roles = message.mentions.roles.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-family-roles")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!roles) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 6 @rol**` })
            if (familyRoles.some(bes => bes.includes(roles.id))) {
                db.pull("five-family-roles", (eleman, sıra, array) => eleman == roles.id, true)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} Rolü Başarıyla Kaldırıldı!**` })
            } else {
                db.push("five-family-roles", roles.id)
                message.reply({ content: `> **✅ Başarılı!**\n> **${roles} (\`${roles.name}\`) Rolü Başarıyla Eklendi!**` })
            }

        } else if (secim == "7") {
            let tag = args[1];
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-tags")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!tag) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 7 <tag>**` })
            if (tagData.some(bes => bes.includes(tag))) {
                db.pull("five-tags", (eleman, sıra, array) => eleman == tag, true)
                message.reply({ content: `> **✅ Başarılı!**\n> **${tag} Başarıyla Kaldırıldı!**` })
            } else {
                db.push("five-tags",tag)
                message.reply({ content: `> **✅ Başarılı!**\n> **${tag} Başarıyla Eklendi!**` })
            }

        } else if (secim == "8") {
            let channel = message.mentions.channels.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-channel-chat")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!channel) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 8 #chat-kanal**` })
            db.set("five-channel-chat", channel.id)
            message.reply({ content: `> **✅ Başarılı!**\n> **${channel} (\`${channel.name}\`) Başarıyla Eklendi!**` })

        } else if (secim == "9") {
            let channel = message.mentions.channels.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-channel-welcome")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!channel) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 9 #chat-kanal**` })
            db.set("five-channel-welcome", channel.id)
            message.reply({ content: `> **✅ Başarılı!**\n> **${channel} (\`${channel.name}\`) Başarıyla Eklendi!**` })

        } else if (secim == "10") {
            let channel = message.mentions.channels.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-channel-voice")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!channel) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 10 #ses-kanal**` })
            db.set("five-channel-voice", channel.id)
            message.reply({ content: `> **✅ Başarılı!**\n> **${channel} (\`${channel.name}\`) Başarıyla Eklendi!**` })

        } else if (secim == "11") {
            let channel = message.mentions.channels.first();
            if (isNaN(args[1]) && args[1] == "sıfırla") {
                db.delete("five-channel-log")
                return message.reply({ content: `> **✅ Başarılı!**\n> **Veri Sıfırlandı!**` })
            }
            if (!channel) return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup 11 #log-kanal**` })
            db.set("five-channel-log", channel.id)
            message.reply({ content: `> **✅ Başarılı!**\n> **${channel} (\`${channel.name}\`) Başarıyla Eklendi!**` })

        }else{ return message.reply({ content: `> **❌ Hatalı Kullanım!**\n> **\`Örnek;\` ${beş_config.prefix}setup <ID> @rol/#kanal/tag**` }) }



    }
}



client.on("interactionCreate", async (beş) => {
    if (!beş.isButton()) return;
    let fiveValue = beş.customId;
let noPermMessage = `> **❌ Bu İşlem İçin \` Yönetici \` Yetkisine Sahip Olmalısın!**`;

        const beş_buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Kurulum Hakkında Bilmeniz Gerekenler`)
                    .setEmoji(`ℹ️`)
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://github.com/Bes-js")
            )




    if (fiveValue == "welcome_image") {
        if(!beş.member.permissions.has(PermissionFlagsBits.Administrator))return beş.reply({content:noPermMessage,ephemeral:true})
        if (!db.has("five-welcome-image")) {
            db.set("five-welcome-image", true);
            beş.reply({ content: `> **✅ Canvaslı / Resimli Hoşgeldin Başarıyla Açıldı!**`, ephemeral: true ,components:[beş_buttons] })
        } else {
            db.delete("five-welcome-image");
            beş.reply({ content: `> **✅ Canvaslı / Resimli Hoşgeldin Başarıyla Kapatıldı!**`, ephemeral: true ,components:[beş_buttons] })
        }
    } else if (fiveValue == "welcome_mentions") {
        if(!beş.member.permissions.has(PermissionFlagsBits.Administrator))return beş.reply({content:noPermMessage,ephemeral:true})
        if (!db.has("five-welcome-mentions")) {
            db.set("five-welcome-mentions", true);
            beş.reply({ content: `> **✅ Hoşgeldin Rol Etiketi Başarıyla Açıldı!**`, ephemeral: true,components:[beş_buttons]  })
        } else {
            db.delete("five-welcome-mentions");
            beş.reply({ content: `> **✅ Hoşgeldin Rol Etiketi Başarıyla Kapatıldı!**`, ephemeral: true,components:[beş_buttons] })
        }
    } else if (fiveValue == "tag_mode") {
        if(!beş.member.permissions.has(PermissionFlagsBits.Administrator))return beş.reply({content:noPermMessage,ephemeral:true})
        if (!db.has("five-welcome-tagmode")) {
            db.set("five-welcome-tagmode", true);
            beş.reply({ content: `> **✅ Taglı Alım Başarıyla Açıldı!**`, ephemeral: true,components:[beş_buttons] })
        } else {
            db.delete("five-welcome-tagmode");
            beş.reply({ content: `> **✅ Taglı Alım Başarıyla Kapatıldı!**`, ephemeral: true,components:[beş_buttons]  })
        }

    }

})
