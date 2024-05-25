const { EmbedBuilder } = require("discord.js");

module.exports = {
    exportEmbed (client, track) {
        return  { embeds: [EmbedPlay(client, track)]};
    }
}

// possible to upgrade
EmbedPlay = function(client, track) {
    return new EmbedBuilder()
     .setColor(0x33A1FD)
     .setTitle("Add to queue")
     .setThumbnail(track.thumbnail)
     .addFields(
		{ name: "Track", value: `${track.title} (${track.duration}) by ${track.author}` },
	)
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL()});
}
