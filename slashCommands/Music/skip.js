const emoji = require("../../emoji.json");
module.exports = {
    name: 'skip',
    description: "To SKIP Music",
    inVoiceChannel: true,
    run: async (client, interaction) => {
      const queue = client.distube.getQueue(interaction)
      if (!queue) return interaction.reply(`${emoji.error} | There is nothing in the queue right now!`)
      try {
        const song = await queue.skip()
        interaction.reply(`${emoji.upvote} | Skipped! Now playing:\n${song.name}`)
      } catch (e) {
        interaction.reply(`${emoji.error} | ${e}`)
      }
    }
  }