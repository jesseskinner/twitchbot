function shoutout([username], { isAdmin, isMod, displayName, onChat }) {
    if (isAdmin || isMod) {
        onChat(
            `Shout out to ${username}, please give them a follow over at https://twitch.tv/${username}`
        );
    } else {
        onChat(
            `Sorry @${displayName}, only mods and admins can use that feature`
        )
    }
}

exports.shoutout = shoutout;
