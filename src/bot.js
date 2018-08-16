const TwitchJS = require('twitch-js/lib');
const { run } = require('./commands/index');

async function bot({ channels, username, password }) {
	const client = TwitchJS.client({
		channels,
		identity: {
			username,
			password
		}
	});

	client.on('chat', (channel, userstate, message, self) => {
		console.log(`${channel}/${userstate['display-name']}> ${message}`);

		//if (self) return;

		const [firstWord, ...args] = message.split(' ');

		if (firstWord.substr(0, 1) === '!') {
			const command = firstWord.substr(1);

			run(command, args, {
                displayName: userstate['display-name'],

                isMod: userstate.mod,
                
				isAdmin:
					`#${userstate['display-name'].toLowerCase()}` ===
					channel.toLowerCase(),

				onChat: function(message) {
					console.log(`[onChat] ${message}`);

					client.say(channel, message);
				}
			});
		}
	});

	await client.connect();

	channels.map(channel => client.say(channel, `HeyGuys`));
}

exports.bot = bot;
