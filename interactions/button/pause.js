const { ComponentType, ButtonStyle } = require("discord.js");
const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const embed = require("../../ressources/embeds/player");

module.exports = {
    name: "pause",
    type: ComponentType.Button,

    async runSlash(client, interaction) {
        const file = client.commands.find(i => i.name === "pause");
        const state = await file.runSlash(interaction);
        if (state === null) return;
        const skip = embed.skipButton;
        const stop = embed.stopButton;
        const row = new ActionRowBuilder()
         .addComponents(toto(state), skip, stop);
        await interaction.message.edit({components: [row]});
    }
}

const toto = function (state) {
    return new ButtonBuilder()
     .setCustomId("pause")
     .setLabel(state === "played" ? "⏸️" : "▶️")
     .setStyle(ButtonStyle.Secondary);
}