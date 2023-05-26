const { SlashCommandBuilder } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: 'play',
  description: 'song play',  
  inVoiceChannel: true,
  run: async (client, message, args)  => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${emoji.error} | Please enter a song url or query to search.`)
   
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}