const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
  name: 'test',
  run: async (client, message) => {

    const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1076018722264862770/1087042178544578652/musicplayer.png');
    const Thumbnail = await Canvas.loadImage(`${`https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`}`);

	  context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.drawImage(Thumbnail, 50, 50, 170, 100);
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = '25px Open Sans';
	  context.fillStyle = '#ffffff';
	  context.fillText('Thenmozhi', 250, 100);
	  const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

	  message.reply({ files: [attachment] });
  }
}