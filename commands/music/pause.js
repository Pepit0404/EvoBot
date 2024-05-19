const { useQueue } = require("discord-player");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const name = "pause";
const description = "Pause or resume the music"

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
        if (!queue || !queue.isPlaying()){
            return await interaction.reply("I don't play music");
        }

        const voiceChannelUser = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelUser) return await interaction.followUp("You are not in a voice channel");
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelUser.id) return await interaction.followUp("You are not in the same channel than me"); 

        if (queue.node.isPaused()){
            queue.node.resume();
            await interaction.reply("Music resumed");
        } else {
            queue.node.pause();
            interaction.reply("Music paused");
        }
    }
};