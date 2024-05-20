const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle } = require("discord.js");

const skip = new ButtonBuilder()
 .setCustomId("skip")
 .setLabel("⏭️")
 .setStyle(ButtonStyle.Secondary);

const stop = new ButtonBuilder()
 .setCustomId("reset")
 .setLabel("⏹️")
 .setStyle(ButtonStyle.Danger);

module.exports = {
    skipButton: skip,
    stopButton: stop,
    exportEmbed (client, queue, track) {
        const row = new ActionRowBuilder()
         .addComponents(queue.node.isPaused() ? play("▶️") : play("⏸️"), skip, stop)
        return  { embeds: [playEmbed(client, queue, track)], components: [row] };
    }
}

playEmbed = function(client, queue, track) {
    return new EmbedBuilder()
     .setColor(0x33A1FD)
     .setTitle("Now playing")
     .setThumbnail(track.thumbnail)
     .addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: "Track", value: `${track.title}` },
		{ name: "Duration", value: `${track.duration} min` },
        { name: "Author", value: `${track.author}` },
		{ name: "Request by", value: `<@${track.requestedBy.id}>` },
	)
    .setTimestamp()
    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL()});
}

const play = function (state) {
    return new ButtonBuilder()
     .setCustomId("pause")
     .setLabel(state)
     .setStyle(ButtonStyle.Secondary);
};