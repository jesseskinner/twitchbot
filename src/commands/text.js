const commands = require('../../commands.json');
const path = require('path');
const { writeFile } = require('fs');
const commandsPath = path.join(__dirname, '..', '..', 'commands.json');

exports.newCommand = ({ args: [command, ...text], say }) => {
	commands[command] = text.join(' ');

	writeFile(commandsPath, JSON.stringify(commands), error => {
		if (error) {
			say(`Oh noes! The command failed to save BibleThump`);
		} else {
			say(`Your command has been added! Try it out: !${command}`);
		}
	});
};

exports.commands = commands;
