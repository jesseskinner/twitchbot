const { shoutout } = require('./shoutout');
const { uptime } = require('./uptime');

const commands = {
	restricted: {
		so: shoutout,
		shoutout
	},
	public: {
		uptime
	}
};

function run(command, context) {
	if (command in commands.public) {
		return commands.public[command](context);
	}

	if (command in commands.restricted) {
		if (isAdmin || isMod) {
			return commands.restricted[command](context);
		} else {
			return context.say(
				`Sorry @${
					context.displayName
				}, only mods and admins can use that feature`
			);
		}
	}

	context.say(`Sorry, I don't know that command!`);
}

exports.run = run;
