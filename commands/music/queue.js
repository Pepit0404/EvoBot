const { useQueue } = require("discord-player");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const embed = require("../../ressources/embeds/queueE");

const name = "queue";
const description = "Display the queue"

module.exports = {
    name: name,
    description: description,
    data: new SlashCommandBuilder()
     .setName(name)
     .setDescription(description)
     .setDMPermission(false)
     .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    
    async run(client, message) {
        return;
    },

    async runSlash(interaction) {
        const queue = useQueue(interaction.guild.id);
        
        if (!queue || !queue.isPlaying()) return await interaction.reply("I don't play music");
        if (queue.history.nextTrack) return await interaction.reply("There isn't music after this one");
        
        await interaction.reply(embed.exportEmbed(queue, 0));
    }
};