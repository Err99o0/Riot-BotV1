const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle , StringSelectMenuBuilder} = require('discord.js');
const emoji = require("../../emoji.json");

module.exports = {
	name: 'help',
	description: "Get Help Commands",
  ownerOnly: false,
   
run: async (client, interaction) => {
    
    const mainmenu = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: 'https://riotbot.ml' })
      //.setTitle(`${client.user.username} Help`)
      .setDescription(`Hey <@${interaction.user.id}>, I'm <@${client.user.id}>!`)
      .setImage('https://cdn.discordapp.com/attachments/1051313457628196895/1087650540751695882/static.png')   
    .addFields(
    {name: `__ABOUT RiotBot__`, value: `>>> **A multipurpose discord bot with awesome features**`},
        {name: '__Features__', value: `>>> • Webhook Welcome System\n• Suggestion System\n• Advanced Ticket System With Transcript\n• Music System\n`},
        {name: '__BOT STATUS__', value: `>>>  ${emoji.ping} Ping: **${Math.round(client.ws.ping)}**ms \n ${emoji.dev} Developer: [Britto#3975](https://discord.com/users/910188379625390090) \n ${emoji.online} Guilds: ${client.guilds.cache.size} Servers \n ${emoji.stage} Members: ${client.users.cache.size} Users`},
    )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })});

      const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Select One Catergory To Browse Commands')
					.addOptions(
            {
							label: 'Home',
							description: 'Home',
							value: 'first_option',
              emoji: '1087688273679351808',
						},
						{
							label: 'Information',
							description: 'Information',
							value: 'second_option',
              emoji: '833101995723194437',
						},
						{
							label: 'Music',
							description: 'Music System',
							value: 'third_option',
              emoji: '1087118180704600074',
						},
            {
							label: 'Setup',
							description: 'Slash Commands',
							value: 'fourth_option',
              emoji: '951687699255951370',
						},         
					),
			);
    let _commands;
    let editEmbed = new EmbedBuilder();
    const m = await interaction.reply({
        embeds: [mainmenu],
        components: [row]
    })      

      const collector = m.createMessageComponentCollector({
        filter: (b) => {
          if (b.user.id === interaction.user.id) return true;
          else {
            b.reply({
              ephemeral: true,
              content: `Only **${interaction.user.tag}** can use this button, run the command again to use the help menu.`,
            });
            return false;
          }
        },
        time: 60000,
        idle: 60000 / 2,
      });

      collector.on("end", async () => {
        if (!m) return;
        await m
          .edit({
            embeds: [mainmenu], components: []
        })
          .catch(() => {});
      });

      collector.on("collect", async (b) => {
        if (!b.deferred) await b.deferUpdate();
        if (b.values[0] === "first_option") {
          if (!m) return;
          return await m.edit({
            embeds: [mainmenu],
            components: [row],
          });
        }
        if (b.values[0] === "third_option") {
          
          editEmbed
            .setColor(client.embedColor)
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: 'https://riotbot.ml' })
            //.setTitle(`${client.user.username} Help`)
            .setDescription("**Music Commands**\n\n</play:1087389975827468369> - To play music\n\n</stop:1087394726552031282> - To stop music\n\n</pause:1087395507632087120> - To pause music\n\n</nowplaying:1087396150241398804> - To get the current playing Music details\n\n</skip:1087396770629300234> - To skip song to next song\n\n</volume:1087398076039311551> - To set music volume")
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `Total 6 music commands.` });
          if (!m) return;
          return await m.edit({
            embeds: [editEmbed],
            components: [row],
          });
        }
        if (b.values[0] === "second_option") {     
          editEmbed
            .setColor(client.embedColor)
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: 'https://riotbot.ml' })
            .setDescription("**Info Commands**\n\n</invite:1087752574377140317> - To show invite of paradise bot\n\n</ping:1087752574377140318> - To show ping of paradise bot\n\n</avatar:1087277209120673870> - To get a user's avatar\n\n</role add:1087277209120673862> - To add a role to a user\n\n\n**Prefix Commands**\n\n+announce - To announce\n+say - To send message\n+botinfo - To get about me")
            //.setTitle(`${client.user.username} Help`)
            .setFooter({
              text: `Total 4 information commands.`,
            });
          return await m.edit({
            embeds: [editEmbed],
            components: [ row ],
          });
        }
        if (b.values[0] === "fourth_option") {        
          editEmbed
            .setColor(client.embedColor)
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: 'https://riotbot.ml' })
            .setDescription("**Setup Commands**\n\n</setup-suggestion:1087277209120673867> - To setup suggestion system\n\n</remove-suggestion:1087277209120673864> - To remove suggestion system\n\n</setup-ticket:1087277209120673868> - To setup ticket system\n\n</remove-ticket:1087277209120673865> - To remove ticket system\n\n</setup-welcome:1087277209120673869> - To setup welcome system\n\n</remove-welcome:1087277209120673866> - To remove welcome system\n\n</jointocreate set:1087277209120673863>  - To setup/delete Join to create vc system")
            //.setTitle(`${client.user.username} Help`)
            .setFooter({ text: `Total 7 setup and remove commands.` });
          return await m.edit({
            embeds: [editEmbed],
            components: [ row ],
          });
        }
      });

      
   
    }
}