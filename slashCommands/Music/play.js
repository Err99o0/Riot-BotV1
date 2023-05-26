const { EmbedBuilder } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
	name: 'play',
	description: "Enter music to play",
    ownerOnly: false,
    inVoiceChannel: true,
    options:[
        {
            name: 'search',
            description: "Music Name",
            type: 3,
            required: true,
        }
    ],
   
    run: async (client, interaction) => {
        const string = interaction.options.getString("search");

        client.distube.play(interaction.member.voice.channel, string, {
        member: interaction.member,
        textChannel: interaction.channel,
        interaction
      })
      const embed = new EmbedBuilder()
      .setColor(0xFFA500)
      .setDescription(`${emoji.loading2} Searching Song`)
      const done = new EmbedBuilder()
      .setColor(0xFFA500)
      .setDescription(`${emoji.upvote} Searching Done.`)
      /*await interaction.reply({embeds: [embed]})
      await interaction.editReply({embeds: [done]})*/
        await interaction

                .reply({

                  embeds: [embed],

                })

                .then((message) => {

                  setTimeout(() => {

                    message.delete().catch((err) => console.log(err));

                  }, 7 * 1000);
    }
                      )
}
}