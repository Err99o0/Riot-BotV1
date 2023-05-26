const {Message, Client, SlashCommandBuilder, PermissionFlagsBits, WebhookClient} = require("discord.js");
const welcomeSchema = require("../../schema/Welcome");
const {model, Schema} = require("mongoose");
const emoji = require("../../emoji.json");
module.exports = {
    name: 'setup-welcome',
    description: 'setup welcome channel',
    default_member_permissions: 'ManageGuild',
    userPrems: ["ManageGuild"],
    botPerms: ["ManageGuild"],
    options: [
    {
    name: 'channel',
    description: 'channel for welcome members',
    type: 7,
    required: true,
    },
    {
    name: 'welcome-message',
    description: 'message for welcome members',
    type: 3,
    required: true,
    },
    {
    name: 'welcome-role',
    description: 'role for welcome members',
    type: 8,
    required: true,
    },
    ],

    run: async (client, interaction) => {
        //const {channel, options} = interaction;

        const welcomeChannel = interaction.options.getChannel("channel");
        const welcomeMessage = interaction.options.getString("welcome-message");
        const roleId = interaction.options.getRole("welcome-role");
        const CreatedWebhook = welcomeChannel.createWebhook({
            name: `PARADISE BOT`,
            avatar: `https://cdn.discordapp.com/avatars/1042783037580128256/e4d7e0647ed7aef59362552bab01ff48.webp?size=4096`,
        });
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: `${emoji.error} I don't have permissions for this.`, ephemeral: true});
        }

        welcomeSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
                    Role: roleId.id
                });
            }
            interaction.reply({content: `${emoji.on} Succesfully created a welcome message`, ephemeral: true});
        })
    }
}