function message({ args: [command, ...message], addCommand }) {
	addCommand(command, ({ say }) => say(message.join(' ')));
}

exports.message = message;
