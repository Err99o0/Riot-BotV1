const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {
    const memberscount = (`${client.users.cache.size}`/1000);
     let statuses = [`/help | ${client.guilds.cache.size} servers | ${Math.round(memberscount)}k members`];
    	setInterval(function () {
      	let status = statuses[Math.floor(Math.random() * statuses.length)];
        
        client.user.setPresence({
  		activities: [{ name: status, type: ActivityType.Watching}],
  		status: 'online',
		});
    	}, 5000);                
  		
	console.log(chalk.red(`Logged in as ${client.user.tag}!`))
    
});