const textCommandMap = {
	tkf:
		'Check out all thse awesome Twitch streamers in The Knowledge Fellowship Discord! https://discord.gg/nYdgZjj and Twitter https://twitter.com/TheKnowledgeFe1',
	system:
		'I\'m coding on a laptop: MSI 15.6" GL62 6QF-1225 Intel Core i7 6700HQ (2.60 Ghz), NVIDIA GeForce GTX 960M 16GB Memory, 128GB SSD, 1TB HDD. No idea what any of that means Kappa',
	hardware:
		'I\'m coding on a laptop: MSI 15.6" GL62 6QF-1225 Intel Core i7 6700HQ (2.60 Ghz), NVIDIA GeForce GTX 960M 16GB Memory, 128GB SSD, 1TB HDD. No idea what any of that means Kappa',
	discord:
		'Come hang out on the Coding with Jesse discord server! https://discord.gg/3ZBDHb2'
};

const textCommands = {};

Object.keys(textCommandMap).map(
	key => (textCommands[key] = ({ say }) => say(textCommandMap[key]))
);

module.exports = textCommands;
