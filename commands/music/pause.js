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

    async runSlash(interaction, args) {
        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.isPlaying()){
            return await interaction.followUp("I don't play music");
        }

        const voiceChannelUser = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelUser) {
            await interaction.reply("You are not in a voice channel");
            return null;
        }
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelUser.id) {
            await interaction.reply("You are not in the same channel than me"); 
            return null;
        }
        if (queue.node.isPaused()){
            queue.node.resume();
            await interaction.reply("Music resumed");
            return "played";
        } else {
            queue.node.pause();
            interaction.reply("Music paused");
            return "paused";
        }
    }
};