const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('..');
const ms = require('ms');
client.on('messageCreate', async message => {
        if (message.author.bot) return;

		// In case the user tries to dm the bot
        const embed = new EmbedBuilder()
							.setColor(client.embedColor)
							.setAuthor({
								name: client.user.username,
								iconURL: client.user.displayAvatarURL(),
							})
							.setDescription(
								`Ayo, you called me? I'm **[${client.user.username}](https://riotbot.ml)** Nice to meet you. Type \`/\` & click on my logo to see all my commands!\n\n*This message will be deleted in \`10 seconds\`!*`,
							)
							.setThumbnail(client.user.displayAvatarURL())
							.setFooter({ text: message.author.tag })
                            .setTimestamp();
            const row = new ActionRowBuilder().addComponents(
							new ButtonBuilder()
								.setStyle(ButtonStyle.Link)
								.setURL('https://riotbot.ml')
								.setLabel('Invite Website'),
							new ButtonBuilder()
								.setStyle(ButtonStyle.Link)
								.setURL('https://dsc.gg/pcrpdeveloping')
								.setLabel('Support Server'),
						);
						
						const ownerembed = new EmbedBuilder()
							.setColor(client.embedColor)
							.setAuthor({
								name: message.author.tag,
								iconURL: message.author.displayAvatarURL({dynamic: true}),
								url: `https://discord.com/users/${message.author.id}`,
							})
							.setTitle(`FeedBack System`)
							.setDescription(
								`${message.content}`
							)
			.setURL(`https://discord.com/users/${message.author.id}`)				.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
							.setFooter({ text: `Report From ${message.author.tag}` })
                            .setTimestamp();
                            
                     const userembed = new EmbedBuilder()
							.setColor(client.embedColor)
							.setAuthor({
								name: message.author.tag,
								iconURL: message.author.displayAvatarURL({dynamic: true}),
								url: `https://discord.com/users/${message.author.id}`,
							})
							.setTitle(`FeedBack Sended Successfully`)
							.setDescription(
								`${message.content}`
							);
							
							const feedbackchannel = client.channels.cache.get("1089888737489588244");
							
            
		if (!message.guild || !message.guild.available) {
            feedbackchannel.send({embeds: [ownerembed]});
			return message.reply({embeds: [userembed], components: [row]})
            
}
		const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);

		if (message.content.match(mentionRegex)) {
			message
				.reply({embeds: [embed], components: [row]}).then((msg) => {
					setTimeout(() => {
						msg.delete().catch((err) => {
							if (err.code !== 10008) return console.log(err);
						});
					}, ms('10s'));
				});
       }
})