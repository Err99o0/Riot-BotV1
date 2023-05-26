const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	userPerms: [],
	botPerms: [],
	run: async (client, interaction) => {
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription(`Invite the bot to your server. [Invite Me](${inviteUrl})`)
		.setColor('#03fcdb')
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: client.user.tag })
const invitebut = new ButtonBuilder()

			.setLabel('Invite')

			.setURL(inviteUrl)

			.setStyle(ButtonStyle.Link)

const websitebut = new ButtonBuilder()
			.setLabel('Website')
			.setURL("https://riotbot.ml")
			.setStyle(ButtonStyle.Link)

		const actionRow = new ActionRowBuilder()
		.addComponents([invitebut, websitebut]) 
			
		
		return interaction.reply({ embeds: [embed], components: [actionRow] })
	}
};
