const { ChannelType, EmbedBuilder } = require("discord.js");
const config = require("../config.json");
const client = require('..');

client.on('guildCreate', async guild => {
      
  try {  
      const joinchannel = client.channels.cache.get(config.logs);
      
      
    const msgembed = new EmbedBuilder()
    .setTitle(`__Thanks For Adding Me!__`)
    .setColor(0xFFA500)                      
    .setDescription("**I'm [RiotBot](https://riotbot.ml)**\nA multipurpose discord bot\nYou can explore my commands using </help:1087246698532835403>")
    .addFields(
      {name: `**__ABOUT BOT__**`, value: `>>> **Ping: **${Math.round(client.ws.ping)} ms**\nDeveloper: [Britto#3975](https://discord.com/users/910188379625390090)\nWebsite: [Invite Me](https://riotbot.ml)\nSupport Server: [PCRP DEVELOPINGS](https://dsc.gg/pcrpdeveloping)**`},
    )

    let own = await guild?.fetchOwner();
    let text;
    guild.channels.cache.forEach((c) => {
      if (c.type === ChannelType.GuildText && !text) text = c;
    });
    const invite = await text.createInvite({
      reason: `For ${client.user.tag} Developer(s)`,
      maxAge: 0,
    });
    
    const embed = new EmbedBuilder()
      .setThumbnail(guild.iconURL({ size: 1024 }))
      .setTitle(`<:icon_join:1087283943272894486> Joined a Guild !!`)
    .setColor(0x00FF00)
      .addFields([
        { name: "Name", value: `\`${guild.name}\`` },
        { name: "ID", value: `\`${guild.id}\`` },
        {
          name: "Owner",
          value: `\`${
            guild.members.cache.get(own.id)
              ? guild.members.cache.get(own.id).user.tag
              : "Unknown user"
          }\` ${own.id}`,
        },
        { name: "Member Count", value: `\`${guild.memberCount}\` Members` },
        {
          name: "Creation Date",
          value: "Unknown",
        },
        {
          name: "Guild Invite",
          value: `[Here is ${guild.name} invite ](https://discord.gg/${invite.code})`,
        },
        {
          name: `${client.user.username}'s Server Count`,
          value: `\`${client.guilds.cache.size}\` Servers`,
        },
      ])
      .setTimestamp();
      
    joinchannel.send({ embeds: [embed] });
    
    text.send({embeds: [msgembed]});

         } catch(error){
              console.log(error);
          }
  }); 


