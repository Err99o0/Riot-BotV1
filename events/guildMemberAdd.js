
const {GuildMember, Embed, InteractionCollector, EmbedBuilder} = require("discord.js");
const emoji = require("../emoji.json");
const Schema = require("../schema/Welcome");
const client = require('..');

client.on("guildMemberAdd", (member)  => {
    
         Schema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;

            let channel = data.Channel;            
             const userId = member.user.id;

             

            let Msg = data.Msg || ` Welcome <@${userId}>`;            
             const {user, guild} = member;

            let Role = data.Role;

            const welcomeChannel = member.guild.channels.cache.get(data.Channel);
            
            const webhooks = await welcomeChannel.fetchWebhooks().catch(err =>
            	welcomeChannel.send(`${emoji.error} | Unable to find webhooks. Please reset welcome system`)
            );
            const webhook = webhooks.find(wh => wh.token);

            const ErrorEmbed = new EmbedBuilder()
            .setTitle(`**Welcome To ${guild.name}**`)          
            .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`,url: `https://discord.com/api/oauth2/authorize?client_id=${member.user.id}&permissions=8&scope=bot`})
            .setDescription(data.Msg)
            .setColor(0x303236)
            .setImage('https://media.discordapp.net/attachments/702831042276491345/803725715605946368/sv.gif')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields({name: `${emoji.guildjoin} Total members`, value: `${guild.memberCount}`})
            .setTimestamp();

            if(!webhook) return welcomeChannel.send({embeds: [ErrorEmbed]})

            const welcomeEmbed = new EmbedBuilder()
            .setTitle(`**Welcome To ${guild.name}**`)          
            .setAuthor({ name: `${member.user.username}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`,url: `https://discord.com/api/oauth2/authorize?client_id=${member.user.id}&permissions=8&scope=bot`})
            .setDescription(data.Msg)
            .setColor(0x303236)
            .setImage('https://media.discordapp.net/attachments/702831042276491345/803725715605946368/sv.gif')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields({name: `${emoji.guildjoin} Total members`, value: `${guild.memberCount}`})
            .setFooter({ text: `Powered By RiotBoT`, iconURL: 'https://cdn.discordapp.com/attachments/1031955609773412443/1089463172630589450/Picsart_23-03-26_13-43-05-801.png' })
            .setTimestamp();
     
            webhook.send({
                content: `<@${userId}> ${emoji.newmember}`,
                username: `${guild.name}`,
                avatarURL: `${guild.iconURL({dynamic: true})}`,
                embeds: [welcomeEmbed]
            });
            member.roles.add(data.Role).catch(err => 
                                             welcomeChannel.send(`${emoji.error} | Unable to give <@&${data.Role}>. Please put the RiotBot Role above the autorole`)
									)      
    })
        
})
