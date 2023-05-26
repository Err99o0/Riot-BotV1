const {
  SlashCommandBuilder,
  ApplicationCommandOptionType,
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
    name: "setup-ticket",
    description: "Ticket options and setup",
    default_member_permissions: 'ManageGuild',
    userPrems: ["ManageGuild"],
    botPerms: ["ManageGuild"],
            options:[
                {
                    name: "channel",
                    type: 7,
                    description: "channel to send the ticket message in",
                    required: true,
                },
                {
                    name: "category",
                    type: 7,
                    description: "Category to create the ticket in",
                    required: true,
                },
                {
                    name: "support-role",
                    type: 8,
                    description: "Support role for the ticket",
                    required: true,
                },
                {
                    name: "ticket-logs",
                    type: 7,
                    description: "The channel where ticket logs get sent in.",
                    required: true,
                },
                {
                    name: "description",
                    type: 3,
                    description: "The text to send with the ticket panel",
                    required: true,
                },
            ],
    
   
    

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  run: async (client, interaction, args, ee) => {
    
      const channel = interaction.options.getChannel("channel");
      const category = interaction.options.getChannel("category");
      const supportRole = interaction.options.getRole("support-role");
      const description = interaction.options.getString("description");
      const ticketLogs = interaction.options.getChannel("ticket-logs");

      const data = await ticketSchema.findOne({
        guildId: interaction.guild.id,
      });

      if (data) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("You have already created the ticket system")
              .addFields({
                name: "🎫 Channel",
                value: `<${data.channelId}>`,
                inline: true,
              }),
          ],
          ephemeral: true,
        });
        return;
      }

      const newSchema = new ticketSchema({
        _id: Types.ObjectId(),
        guildId: interaction.guild.id,
        channelId: channel.id,
        supportId: supportRole.id,
        categoryId: category.id,
        logsId: ticketLogs.id,
      });

      newSchema.save().catch((err) => console.log(err));

      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket System")
              .setDescription(`${emoji.on} Successfully setup ticket system!`)
              .addFields(
                {
                name: "🎫 Channel",
                  value: `<${channel.id}>`,
                  inline: true,
                },
                {
                  name: "💠 Support Role",
                  value: `  <@&${supportRole.id}>`,
                  inline: true,
                },
                {
                  name: "📔 Panel Description",
                  value: `  ${description}`,
                  inline: true,
                },
                {
                  name: "🎟️ Ticket Logs",
                  value: `<${ticketLogs}>`,
                }
              ),
          ],
          ephemeral: true,
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            content:err,// "An error has occurred...",
          });
        });

      const sampleMessage =
        'Welcome to tickets! Click the "Create Ticket" button to create a ticket and the support team will be right with you!';

      client.channels.cache.get(channel.id).send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ticket System")
          .setColor(0x303236)  .setDescription(description == null ? sampleMessage : description)
            .setImage(
              "https://cdn.discordapp.com/attachments/1051313457628196895/1087649215682981918/standard_1.gif"
            ),
        ],
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("createTicket")
              .setLabel("Create")
              .setEmoji("<:ticketbadge:1010601796374364171>")
              .setStyle(ButtonStyle.Primary)
          ),
        ],
      });

  
    
  },
};
