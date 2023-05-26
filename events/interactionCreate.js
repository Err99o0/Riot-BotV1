const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('..');
const config = require('../config.json');
const emoji = require("../emoji.json");
const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
		if (!interaction.type == 2) return;
	
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {
			
if(slashCommand.ownerOnly) {
            if (!config.ownerid.includes(interaction.user.id)) return await interaction.reply({

                            embeds: [new EmbedBuilder()

                                .setDescription(`${emoji.error} | **Unable To Use ${slashCommand.commandName} command. Contact Owner Using /feedback**`)

                                .setColor("#FF0000")] });

            }
			if (slashCommand.inVoiceChannel && !interaction.member.voice.channel) {
				return interaction.reply(`${emoji.nomic} | You must be in a voice channel!`)
			  }
    if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), {long : true}) ) })
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}

					await slashCommand.run(client, interaction);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return interaction.reply({ embeds: [botPerms] })
					}

				}
					await slashCommand.run(client, interaction);
					const commandLogsChannel = client.channels.cache.get(config.cmdlog);
                    if (!commandLogsChannel) return;
                    commandLogsChannel.send({
                        embeds: [new EmbedBuilder()
                            .setColor(0x00FF00)
                            .setTitle(`Command used log | from ${interaction.guild.name}`)
                            .addFields(
                                {name:`** Author**`, value: `<@${interaction.user.id}>(${interaction.user.tag})`},
                            {name: `** Command Name**`, value:`/${slashCommand.name}`},
                                )
                            .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                        ]
                    });
			}
		} catch (error) {
				console.log(error);
		}
});