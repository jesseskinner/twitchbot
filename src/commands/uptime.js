async function uptime({ say, api }) {
	const stream = await api(
		`https://api.twitch.tv/helix/streams?user_login=jesseskinner`
    );
    
    if (stream && stream.data && stream.data[0]) {
        const { started_at } = stream.data[0];
        const elapsedTime = +(new Date) - +(new Date(started_at));
        const minutes = Math.floor(elapsedTime / 60 / 1000);
        const hours = Math.floor(minutes / 60);
        const minutesThisHour = minutes % 60;
        const elapsed = `${plural(hours, 'hour')} and ${plural(minutesThisHour, 'minute')}`;

        say(`Jesse has been coding for ${elapsed}.`);
    } else {
        say(`Jesse is coding offline right now. Please give a follow and turn notifications on to be notified when he starts live coding again.`)
    }
}

function plural(number, label) {
    return `${number} ${label}${number !== 1 ? 's' : ''}`;
}

exports.uptime = uptime;
