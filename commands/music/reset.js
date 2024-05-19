const { useQueue } = require("discord-player");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const name = "reset";
const description = "Stop the music and reset the queue"

module.exports = {
    name: name,
    description: description,
    data: new SlashCommandBuilder()
     .setName(name)
     .setDescription(description)
     .setDMPermission(false)
     .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    
    async run(client, message) {
        const queue = useQueue(message.guild.id);
        if (!queue || !queue.isPlaying()){
            return await message.reply("I don't play music");
        }

        const voiceChannelUser = message.member.voice.channel;
        const voiceChannelBot = (await message.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelUser) return await message.reply("You are not in a voice channel");
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelUser.id) return await interaction.reply("You are not in the same channel than me"); 

        queue.node.stop();
        queue.delete();
        interaction.reply("Queue reset");
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

        queue.node.stop();
        queue.delete();
        await interaction.reply("Queue reset");
    }
};