const { shoutout } = require('./shoutout');

const commands = {
	so: shoutout,
	shoutout: shoutout
};

function run(command, args, options) {
	console.log(`[run] ${command}(${args.join(', ')})`);

	if (command in commands) {
		commands[command](args, options);
	}
}

exports.run = run;
