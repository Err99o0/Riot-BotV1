const { EmbedBuilder } = require("discord.js");
//const moment = require("moment");
const client = require('..');
const config = require("../config.json");

    client.on("guildDelete", async (guild) => {
   
       const channel = client.channels.cache.get(config.logs);
    let own = await guild?.fetchOwner();
    let text;
    guild.channels.cache.forEach((c) => {
      if (c.type === "GUILD_TEXT" && !text) text = c;
    });
    /*const invite = await text.createInvite({
      reason: `For ${client.user.tag} Developer(s)`,
      maxAge: 0,
    });*/
    const embed = new EmbedBuilder()
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`<:icon_leave:1087284347154997289> Left a Guild !!`)
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
        /*{
          name: "Guild Invite",
          value: `[Here is ${guild.name} invite ](https://discord.gg/${invite.code})`,
        },*/
        {
          name: `${client.user.username}'s Server Count`,
          value: `\`${client.guilds.cache.size}\` Servers`,
        },
      ])
      .setColor(0x0000FF)
      .setTimestamp();
    channel.send({ embeds: [embed]
          });
});
