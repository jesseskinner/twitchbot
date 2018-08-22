function shoutout({ args: [username], say }) {
	say(
		`Shout out to ${username}, please give them a follow over at https://twitch.tv/${username}`
	);
}

exports.shoutout = shoutout;
