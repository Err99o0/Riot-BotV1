const {Message, Client, SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");

const suggestSchema = require("../../schema/Suggest");
const emoji = require("../../emoji.json");
const {model, Schema} = require("mongoose");

module.exports = {

  name: "setup-suggestion",
  description: "Set up your welcome message for the discord bot.",
    default_member_permissions: 'ManageGuild',
  userPrems: ["ManageGuild"],
  botPerms: ["ManageGuild"],
  options: [{
    name:"channel",
    type: 7,
    required: true,
    description: 'Choose a channel for suggestion.'
        }
    ],

    run: async (client, interaction, args, ee) => {

        //const {channel, options} = interaction;

        const suggestChannel = interaction.options.getChannel("channel");
      

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {

            interaction.reply({content: `${emoji.error} I don't have permissions for this.`, ephemeral: true});

        }

        suggestSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {

            if(!data) {

                const newWelcome = await suggestSchema.create({

                    Guild: interaction.guild.id,

                    Channel: suggestChannel.id

                   // Msg: welcomeMessage

                    //Role: roleId.id

                });

            }

            interaction.reply({content: `${emoji.on} Succesfully created a suggestion channel | ${suggestChannel} |`, ephemeral: true});

        })

    }

}