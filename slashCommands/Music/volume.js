const emoji = require("../../emoji.json");
module.exports = {
    name: 'volume',
    description: "To set music volume",
    inVoiceChannel: true,
    options:[
        {
            name: "vollevel",
            description: "1-100 levels",
            type: 4,
            required: true,
        }
    ],
    run: async (client, interaction) => {
      const queue = client.distube.getQueue(interaction)
      if (!queue) return interaction.reply(`${emoji.error} | There is nothing in the queue right now!`)
      const volume = interaction.options.getInteger("vollevel");
      if (isNaN(volume)) return interaction.reply(`${emoji.error} | Please enter a valid number!`)
      queue.setVolume(volume)
      interaction.reply(`${emoji.upvote} | Volume set to \`${volume}\``)
    }
  }