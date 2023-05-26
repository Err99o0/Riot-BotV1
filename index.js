const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildInvites
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(config.mongodb);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("DB Connected Successfully")
    });
    mongoose.connection.on("err", (err) => {
      console.log(`Mongoose connection error: \n ${err.stack}`, "error");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });

 const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.distube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
    emptyCooldown: 60,

        leaveOnFinish: true,

       leaveOnStop: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: false,
        api: {
            clientId: config.clientId,
            clientSecret: config.clientSecret,
        },
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ]
})

const fs = require('fs');
//const config = require('./config.json');
require('dotenv').config() // remove this line if you are using replit

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;
client.embedColor = config.embedColor;
//client.logger = require('./utils/logger.js')


module.exports = client;


fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(config.TOKEN)
