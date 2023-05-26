const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('..');
const config = require('../config.json');
const emoji = require("../emoji.json");
const prefix = client.prefix;
const cooldown = new Collection();

client.on('messageCreate', async message => {
	if(message.author.bot) return;
	if(message.channel.type !== 0) return;
	if(!message.content.startsWith(prefix)) return; 
	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();
	if(cmd.length == 0 ) return;
	let command = client.commands.get(cmd)
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	
	if(command) {
        if (command.inVoiceChannel && !message.member.voice.channel) {
   				 return message.channel.send(`${emoji.nomic} | You must be in a voice channel!`)
  				}
        if (command.ownerOnly) {

                        if (!config.ownerid.includes(message.author.id)) return await message.reply({

                            embeds: [new EmbedBuilder()

                                .setDescription(`${emoji.error} | **Unable To Use ${prefix}${command.name} command. Contact using /feedback**`)

                                .setColor("#FF0000")] });
            }
   
		if(command.cooldown) {
				if(cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true}) ) });
				if(command.userPerms || command.botPerms) {
					if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [userPerms] })
					}
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [botPerms] })
					}
				}

				command.run(client, message, args)
				cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
				setTimeout(() => {
					cooldown.delete(`${command.name}${message.author.id}`)
				}, command.cooldown);
			} else {
				if(command.userPerms || command.botPerms) {
					if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [userPerms] })
					}
				
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${emoji.error} ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [botPerms] })
					}
			}
			command.run(client, message, args)
			        const commandLogsChannel = client.channels.cache.get(config.cmdlog);
                    if (!commandLogsChannel) return;
                    commandLogsChannel.send({
                        embeds: [new EmbedBuilder()
                            .setColor(0x00FF00)
                            .setTitle(`Command used log | from ${message.guild.name}`)
                            .addFields({name:`** Author**`, value: `<@${message.author.id}>(${message.author.tag})`},
                            {name: `** Command Name**`, value:`+${command.name}`})
                            .setThumbnail(message.guild.iconURL({dynamic: true}))
                        ]
                    });
		}
	}
	
});