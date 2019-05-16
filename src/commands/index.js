const { shoutout } = require('./shoutout');
const { uptime } = require('./uptime');
const { message } = require('./message');
const { title } = require('./title');
const { newCommand, commands: text } = require('./text');

const commands = {
	restricted: {
		so: shoutout,
		shoutout,
		msg: message,
		message,
		title,
		new: newCommand
	},
	public: {
		uptime,
	},
	text
};

function run(command, context) {
	if (command in commands.public) {
		return commands.public[command](context);
	}

	if (command in commands.text) {
		return context.say(commands.text[command]);
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

	// TODO: save command to a wish list
}

function addCommand(command, callback) {
	commands.public[command] = callback;
}

exports.run = run;
