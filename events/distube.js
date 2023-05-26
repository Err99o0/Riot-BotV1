const client = require("../index.js");
const { EmbedBuilder , AttachmentBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder } = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const emoji = require("../emoji.json");

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', async (queue, song) => {
   const canvas = Canvas.createCanvas(1280, 720);
		const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1007364972545835111/1100287010117267476/20230425_103654_0000.png');
    const Thumbnail = await Canvas.loadImage(`${song.thumbnail}`);

	  context.drawImage(background, 0, 0, canvas.width, canvas.height);
   	context.drawImage(Thumbnail, 75, 50, 400, 250);
    //context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = '50px Red Serif';
	  context.fillStyle = '#000000';
	  context.fillText(`${song.name}`, 75, 400);
	  const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    
    const But1 = new ButtonBuilder()
    .setCustomId("voldown")
    .setEmoji(`${emoji.voldown}` )
    .setStyle(ButtonStyle.Secondary);
  const But2 = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji( `${emoji.mute}` )
    .setStyle(ButtonStyle.Secondary);
  const But3 = new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji(`${emoji.pause}`)
    .setStyle(ButtonStyle.Secondary);
  const But4 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji(`${emoji.next}`)
    .setStyle(ButtonStyle.Secondary);
  const But5 = new ButtonBuilder()
    .setCustomId("volup")
    .setEmoji(`${emoji.volup}`)
    .setStyle(ButtonStyle.Secondary);
  const row = new ActionRowBuilder().addComponents(
    But1,
    But2,
    But3,
    But4,
    But5
  );
    
         const nowplay = await queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("#BCBCBC")
                .setTitle(`${emoji.music} ${song.name}`)
.setURL(`${song.url}`)
              .addFields(
                  { name:`${emoji.stage} Requester`, value:`${song.user}`},
                  { name: `${emoji.disc} Duration`, value: `\`${song.formattedDuration}\``}            
                        )
                     .setImage(`attachment://profile-image.png`)],
                files: [attachment],
            components: [row],
        })
    
    const filter = (b) => {
      if (
        b.guild.members.me.voice.channel &&
        b.guild.members.me.voice.channelId === b.member.voice.channelId
      )
        return true;
      else {
        b.reply({
          content: `You are not connected to ${b.guild.members.me.voice.channel.toString()} to use this buttons.`,
          ephemeral: true,
        });
        return false;
      }
    };
  
  const collector = nowplay.createMessageComponentCollector({ filter, time: 120000 });

  collector.on('collect', async (message) => {
    const id = message.customId;
    const queue = client.distube.getQueue(message.guild.id);
    if (id === "pause") {
      if (!queue) {
        collector.stop();
      }
      if (queue.paused) {
        await client.distube.resume(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor("#BCBCBC")
          .setDescription(`${emoji.play} | **Song has been:** \`Resumed\``);

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.pause(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor("#BCBCBC")
          .setDescription(`${emoji.pause} | **Song has been:** \`Paused\``);

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "skip") {
      if (!queue) {
        collector.stop();
      }
      if (queue.songs.length === 1 && queue.autoplay === false) {
        const embed = new EmbedBuilder()
          .setColor("#BCBCBC")
          .setDescription(`${emoji.error} | **There are no \`Songs\` **in queue**`)

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.skip(message)
            const embed = new EmbedBuilder()
              .setColor("#BCBCBC")
              .setDescription(`${emoji.next}  | **Song has been:** \`Skipped\``)

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "stop") {
      if (!queue) {
        collector.stop();
      }
      await client.distube.voices.leave(message.guild);
      const embed = new EmbedBuilder()
        .setDescription(`${emoji.mute}  | **Song has been:** | \`Stopped\``)
        .setColor('#BCBCBC');

      await nowplay.edit({ components: [] });
      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "previous") {
      if (!queue) {
        collector.stop();
      }
      if (queue.previousSongs.length == 0) {
        const embed = new EmbedBuilder()
          .setColor("#BCBCBC")
          .setDescription(`${emoji.error}  | **There are no** \`Previous\` **songs**`)

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.previous(message)
        const embed = new EmbedBuilder()
          .setColor("#BCBCBC")
          .setDescription("\`⏮\` | **Song has been:** `Previous`")

        await nowplay.edit({ components: [] });
        message.reply({ embeds: [embed], ephemeral: true });
      }
    }  else if (id === "volup") {
      if (!queue) {
        collector.stop();
      }
      await client.distube.setVolume(message, queue.volume + 5);
      const embed = new EmbedBuilder()
          .setColor('#BCBCBC')
          .setDescription(`${emoji.volup}  | **Increase volume to:** \`${queue.volume}\`%`)

      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "voldown") {
      if (!queue) {
        collector.stop();
      }
      await client.distube.setVolume(message, queue.volume - 5);
      const embed = new EmbedBuilder()
          .setColor('#BCBCBC')
          .setDescription(`${emoji.voldown}  | **Decrease volume to:** \`${queue.volume}\`%`)

      message.reply({ embeds: [embed], ephemeral: true });
    }
      
      collector.on('end', async (collected, reason) => {
    if (reason === "time") {
      nowplay.edit({ components: [] });
    }
  });
    })
})
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("#BCBCBC")
                    .setDescription(`${emoji.addsong} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]
            }
        )
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`${emoji.addsong} | Added \`${playlist.name}\` playlist (${playlist.songs.length
                        } songs) to queue\n${status(queue)}`)]
            }
        )
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`${emoji.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })
    .on('empty', channel => channel.send({
        embeds: [new EmbedBuilder().setColor("Red")
            .setDescription(`${emoji.nomic} | Voice channel is empty! Leaving the channel...`)]
    }))
    .on('searchNoResult', (message, query) =>
        message.channel.send(
            {
                embeds: [new EmbedBuilder().setColor("Red")
                    .setDescription(`${emoji.error} | No result found for ${query}!`)]
            })
    )
    .on('finish', queue => queue.textChannel.send({
        embeds: [new EmbedBuilder().setColor("Green")
            .setDescription(`${emoji.gold} | Queue finished!`)]
    }))