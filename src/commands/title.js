function title({ args, channelId, api, say }) {
    const status = args.join(' ');

	api(`channels/${channelId}`, 'PUT', {
		channel: {
			status
		}
	}).then(res => res.json()).then(
		res => {
			say('Yessir! Title has been changed.');
			console.log('title', res);
		},
		err => {
			say('Oh noes! Something went wrong changing the title. BibleThump');
			console.error('title', err);
		}
	);
}

exports.title = title;
