module.exports = {
    name: 'pause',
    description: "To Pause Music",
    inVoiceChannel: true,
    run: async (client, interaction) => {
      const queue = client.distube.getQueue(interaction)
      if (!queue) return interaction.reply(`❌ | There is nothing in the queue right now!`)
      if (queue.paused) {
        queue.resume()
        return interaction.reply('Resumed the song for you :)')
      }
      queue.pause()
      interaction.reply('Paused the song for you :)')
    }
  }