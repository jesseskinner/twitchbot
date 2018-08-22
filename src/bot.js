const TwitchJS = require('twitch-js/lib');
const { run } = require('./commands/index');

async function bot({ channels, username, password, clientId }) {
	const client = TwitchJS.client({
		channels,
		identity: {
			username,
			password
		}
	});

	function api(url, method = 'GET') {
		console.log(`[api] ${url}`);

		return new Promise((resolve, reject) =>
			client.api(
				{
					url,
					method,
					headers: {
						'Client-ID': clientId
					}
				},
				function(err, res, body) {
					if (err) {
						reject(err);
					} else {
						resolve(body);
					}
				}
			)
		);
	}

	client.on('chat', (channel, userstate, message, self) => {
		console.log(`${channel}/${userstate['display-name']}> ${message}`);

		//if (self) return;

		const [firstWord, ...args] = message.split(' ');

		if (firstWord.substr(0, 1) === '!') {
			const command = firstWord.substr(1);
			const context = {
				args,

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
