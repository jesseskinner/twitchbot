const TwitchJS = require('twitch-js/lib');
const fetch = require('node-fetch');
const { run } = require('./commands/index');

async function bot({ channelName, channelId, username, password, clientId }) {
	const client = TwitchJS.client({
		channels: [`#${channelName}`],
		identity: {
			username,
			password: `oauth:${password}`
		}
	});

	function api(path, method = 'get', body) {
		console.log(`[api] ${path}`);

		return fetch(`https://api.twitch.tv/kraken/${path}`, {
			method,
			headers: {
				'Client-ID': clientId,
				'Content-Type': 'application/json',
				Accept: 'application/vnd.twitchtv.v5+json',
				Authorization: `OAuth ${password}`
			},
			body: JSON.stringify(body)
		});
	}

	client.on('chat', (channel, userstate, message, self) => {
		console.log(`${channel}/${userstate['display-name']}> ${message}`);

		//if (self) return;

		const [firstWord, ...args] = message.split(' ');

		if (firstWord.substr(0, 1) === '!') {
			const command = firstWord.substr(1);
			const context = {
				args,

				channelId,

				displayName: userstate['display-name'],

				isMod: userstate.mod,

				isAdmin:
					`#${userstate['display-name'].toLowerCase()}` ===
					channel.toLowerCase(),

				say: function(message) {
					console.log(`[chat] ${message}`);

					client.say(channel, message);
				},

				api
			};

			run(command, context);
		}
	});

	await client.connect();

	//channels.map(channel => client.say(channel, `HeyGuys`));
}

exports.bot = bot;
