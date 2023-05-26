const {
  Client,
  Message,
  EmbedBuilder,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');

module.exports = {
  name: "say",
  aliases: ["s"],
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
/*if (message.content.includes("@everyone") || message.content.includes("@here"))  
  return message.channel.send("**HEY DON'T PING EVERYONE / HERE WITH ME**"); */    
       const embed = new EmbedBuilder()
          .setColor(0x303236)
          .setDescription("**Write something**\n ```Usage: -say [text]```")
       
      if (!Content)
        return message.channel.send({ embeds:[embed]});
  
      return message.channel.send({ content: `${Content}` });
       
    } catch (e) {
      message.channel.send(` __**Somthing is wrong. please try again later**__`);      
	console.log(e);
}
  }
}