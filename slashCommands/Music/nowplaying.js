const emoji = require("../../emoji.json");
module.exports = {
    name: 'nowplaying',
    description: "To get the current playing Music details",
    inVoiceChannel: true,
    run: async (client, interaction) => {
      const queue = client.distube.getQueue(interaction)
      if (!queue) return interaction.reply(`${emoji.error} | There is nothing in the queue right now!`)
      const song = queue.songs[0]
      interaction.reply(`${emoji.music} | I'm playing **\`${song.name}\`**, by ${song.user}`)
    }
}