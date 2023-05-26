const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "about",
  aliases: ["botinfo", "info"],
  description: "See information about this project.",
  args: false,
  usage: "",
  userPerms: [],
  ownerOnly: false,
  run: async (client, message, args, prefix) => {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Invite")
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
        ),
      new ButtonBuilder()
        .setLabel("Support")
        .setStyle(ButtonStyle.Link)
        .setURL("https://dsc.gg/pcrpdeveloping")
    );

    const mainPage = new EmbedBuilder()
      .setAuthor({
        name: "Paradise BoT",
        iconURL:
          client.user.displayAvatarURL(),
      })
      .setThumbnail(
        client.user.displayAvatarURL()
      )
      .setDescription(`**RiotBot is a multipurpose bot

Which managing ${client.guilds.cache.size} servers 
**`)
      .setColor(client.embedColor)
      .addFields([
        {
          name: "Creator",
          value:
            "[Britto#3975](https://dsc.gg/pcrpdeveloping)",
          inline: true,
        },
          {
              name: "I'm in",
              value: `[${client.guilds.cache.size} servers](https://riotbot.ml)`,
              inline: false,

          },
      ]);
    return message.reply({ embeds: [mainPage], components: [row] });
  },
};
