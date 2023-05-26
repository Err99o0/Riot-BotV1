const {
  Client,
  Message,
  EmbedBuilder,
} = require('discord.js');
const emoji = require("../../emoji.json");
module.exports = {
  name: "announce",
  aliases: ["ann"],
  description: "Help with all commands, or one specific command.",
  args: false,
  usage: "",
  userPrems: ["ManageGuild"],
  botPerms: ["ManageGuild"],
  ownerOnly: false,
  run: async (client, message, args, prefix) => {
   try{
    message.delete();
    let Content = args.join(" ");  
if (message.content.includes("@everyone") || message.content.includes("@here")) { 
  return message.channel.send("**HEY DON'T PING EVERYONE / HERE WITH ME**"); 
}  
      if (!Content)
      {
        return message.channel.send({ embeds:[new EmbedBuilder()
          .setColor(client.embedColor)     
          .setDescription('**Write something**\n `Usage: -announce [text]`')]});   
 } else {
       const ann = new EmbedBuilder()
       .setTitle(`${emoji.ann} __ANNOUNCEMENT__`)
       .setDescription(`\n**${Content}**\n`)
       //.setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Announced by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),

      }) 
  
      return message.channel.send({ embeds: [ann] });
     
      }
    } catch (e) {
      message.channel.send(` __**Somthing is wrong. please try again later**__`);
      //client.logs(e);
console.log(e);
}
  }
}