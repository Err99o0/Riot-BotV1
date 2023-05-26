const { EmbedBuilder, CommandInteraction } = require("discord.js");
const emoji = require("../../emoji.json");
const config = require("../../config.json");
const Sugdb = require("../../schema/Suggest");

module.exports = {

  name: "remove-suggestion",

  description: "Turn Off the Suggestion system.",
default_member_permissions: 'ManageGuild',
  userPrems: ["ManageGuild"],
  botPerms: ["ManageGuild"],

  owner: false,


run: async (client, interaction) => {
let data = await Sugdb.findOne({ Guild: interaction.guild.id });

    if (data) {

      await data.delete();

      return await interaction

        .reply({

          embeds: [

            new EmbedBuilder()

              .setDescription(`${emoji.off} Successfully removed Suggestion channel.`)

              .setColor(config.embedColor),

          ],

        })

        .catch((err) => console.error("Promise Rejected At", err));

    } else

      return await interaction

        .reply({

          embeds: [

            new EmbedBuilder()

              .setDescription(

                `${emoji.danger} You don't have any Suggestions setup in this guild!`

              )

              .setColor(config.embedColor),

          ],

        })

        .catch((err) => console.error("Promise Rejected At", err));

  },

};

