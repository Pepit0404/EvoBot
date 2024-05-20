const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle } = require("discord.js");
const embed = require("../../ressources/embeds/player");

module.exports = {
    name: "playerStart",
    async run(client, queue, track) {
        await queue.metadata.channel.send(embed.exportEmbed(client, queue, track))
    }
};