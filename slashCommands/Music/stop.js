const emoji = require("../../emoji.json");
module.exports = {
    name: 'stop',
    description: "To Stop Music",
    inVoiceChannel: true,
    run: async (client, interaction) => {
      const queue = client.distube.getQueue(interaction)
      if (!queue) return interaction.reply(`${emoji.error} | There is nothing in the queue right now!`)
      queue.stop()
      interaction.reply(`${emoji.guildleave} | Stopped!`)
    }
  }