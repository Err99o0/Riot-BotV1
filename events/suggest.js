const {
  EmbedBuilder,
  Message,
  Client,
  PermissionsBitField,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonInteraction,
} = require("discord.js");

const client = require('..');
const suggest = require("../schema/Suggest");
const emoji = require("../emoji.json");

client.on("messageCreate", async (message) => {
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
    if (message.author.bot) return;
      	
      let feedback = new Set()
      
      suggest.findOne({Guild: message.guildId}, async (err, data) => {

      if (!data) return;

      let Channel1 = data.Channel;

      if(message.channel.id != `${Channel1}`) return;

      if(message.channel.id = `${Channel1}`) {
      let exampleEmbed = new EmbedBuilder()
	    .setColor(client.embedColor)
	    .setTitle('Suggestions')
	    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`,url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`})
	    .setDescription(`${message.content}`)
      .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: 'Want to suggest something? Simply type in this channel!', iconURL: `${message.guild.iconURL({dynamic: true})}` })
      .setTimestamp()
      let l = 0;
      let i = 0;

      let supvotebutton = new ButtonBuilder().setStyle(ButtonStyle.Secondary) .setEmoji("<a:yes:833101995723194437>") .setCustomId('primary').setLabel(`${l}`)
      let sdownvotebutton = new ButtonBuilder().setStyle(ButtonStyle.Secondary) .setEmoji("<:no:833101993668771842>") .setCustomId('secondary').setLabel(`${i}`)
      let  allbuttonsSave = [new ActionRowBuilder().addComponents([supvotebutton, sdownvotebutton])];
    

      message.channel.send({embeds: [exampleEmbed]/*, components: allbuttonsSave */}).then(async msg =>{
          await message.delete()
          msg.react(`${emoji.upvote}`)
          msg.react(`${emoji.downvote}`)
          })
        }
    })
});
    
          
          
         
       

  