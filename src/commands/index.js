const { shoutout } = require('./shoutout');
const { uptime } = require('./uptime');
const { message } = require('./message');
const { tkf, hardware } = require('./text');

const commands = {
	restricted: {
		so: shoutout,
		shoutout,
		msg: message,
		message
	},
	public: {
		uptime,
		tkf,
		hardware,
		system: hardware,
	}
};

function run(command, context) {
	if (command in commands.public) {
		return commands.public[command](context);
	}

	if (command in commands.restricted) {
		const { isAdmin, isMod, displayName, say } = context;

		if (isAdmin || isMod) {
			return commands.restricted[command]({
				addCommand,
				...context
			});
		} else {
			return say(
				`Sorry @${displayName}, only mods and admins can use that feature`
			);
		}
	}

	context.say(`Sorry, I don't know that command!`);
}

function addCommand(command, callback) {
	commands.public[command] = callback;
}

exports.run = run;
