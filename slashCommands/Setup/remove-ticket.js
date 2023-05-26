const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Types } = require("mongoose");
const emoji = require("../../emoji.json");
const ticketSchema = require("../../schema/ticketSchema");

module.exports = {

    name: "remove-ticket",
    description: "To remove ticket panel",
    default_userPerms: ["Administrator"],

    default_member_permissions: ["ManageGuild"],
      
      
run: async (client, interaction) => {

const ticketData = await ticketSchema.findOne({
        guildId: interaction.guild.id,
      });

      if (!ticketData) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket System")
              .setDescription("You already have a ticket system setup!")
              .addFields(
                {
                  name: "<:SlashCmd:1016055567724326912> Usage",
                  value: "<:reply:1015235235195146301>  /tickets setup",
                  inline: true,
                },
                {
                  name: "<:channelemoji:1015242699277873192> Existing channel",
                  value: `<:reply:1015235235195146301>  <#${ticketData.channelId}>`,
                }
              ),
          ],
          ephemeral: true,
        });
      }

      ticketSchema
        .findOneAndDelete({
          guildId: interaction.guild.id,
        })
        .catch((err) => console.log(err));

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ticket System")
            .setDescription(`${emoji.off} Successfully deleted the ticket system!`),
        ],
        ephemeral: true,
      });
    
  },
};