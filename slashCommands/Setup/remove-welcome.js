const { EmbedBuilder, CommandInteraction } = require("discord.js");
//const MusicBot = require("../../structures/Client");
const Weldb = require("../../schema/Welcome");
const emoji = require("../../emoji.json");
module.exports = {
  name: "remove-welcome",
  description: "Turn Off the welcome system.",
    default_member_permissions: 'ManageGuild',
  userPrems: ["ManageGuild"],
  botPerms: ["ManageGuild"],
 // owner: false,
run: async (client, interaction) => {
let data = await Weldb.findOne({ Guild: interaction.guild.id });
    if (data) {
      await data.delete();
      return await interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`${emoji.off} Successfully removed Welcome channel.`)
              .setColor(client.embedColor),
         ],
        })
        .catch((err) => console.error("Promise Rejected At", err));
    } else
      return await interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `You don't have any Welcome setup in this guild!`
              )
              .setColor(client.embedColor),
          ],
        })
        .catch((err) => console.error("Promise Rejected At", err));
  },
};