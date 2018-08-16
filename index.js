require('dotenv').config({
	path: '../secrets/twitchbot.env'
});

const { bot } = require('./src/bot');

bot({
	channels: ['#jesseskinner'],
	username: process.env.TWITCH_USERNAME,
	password: process.env.TWITCH_PASSWORD
})
	.then(() => console.log('connected?'))
	.catch(e => console.error(e));
