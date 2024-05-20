const { useQueue } = require("discord-player");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const name = "skip";
const description = "Skip the actual music"

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
        if (!voiceChannelUser) {
            await interaction.reply("You are not in a voice channel");
            return null;
        }
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelUser.id) {
            await interaction.reply("You are not in the same channel than me"); 
            return null;
        }
        queue.node.skip();
        await interaction.reply("Song skipped");
    }
};