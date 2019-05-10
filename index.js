require('dotenv').config({
	path: '../secrets/twitchbot.env'
});

const { bot } = require('./src/bot');

bot({
	channelName: 'jesseskinner',
	channelId: 106610665,
	username: process.env.TWITCH_USERNAME,
	password: process.env.TWITCH_PASSWORD,
	clientId: process.env.TWITCH_CLIENT_ID
})
	.then(() => console.log('connected?'))
	.catch(e => console.error(e));
