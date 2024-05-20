const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const name = "play";
const description = "Play a music"

module.exports = {
    name: name,
    description: description,
    data: new SlashCommandBuilder()
     .setName(name)
     .setDescription(description)
     .setDMPermission(false)
     .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
     .addStringOption(opt => opt
        .setName("song")
        .setDescription("Name or link of the song")
        .setRequired(true)
     )
     .addNumberOption(opt => opt
        .setName("volume")
        .setDescription("The desired volume")
        .setRequired(false)
     ),
    
    async run(client, message) {
        return ;
    },

    async runSlash(interaction, args) {
        await interaction.deferReply({ephemeral: true});
        const song = interaction.options.getString("song");

        const voiceChannelUser = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelUser) {
            await interaction.followUp("You are not in a voice channel");
            return;
        }
        if (voiceChannelBot && voiceChannelBot.id !== voiceChannelUser.id) {
            await interaction.followUp("You are not in the same channel than me");
            return;
        } 


        try {
            const { track } = await interaction.client.player.play(voiceChannelUser, song, {
                requestedBy: interaction.user,
                nodeOptions: {
                    metadata: interaction,
                    volume: 70,
                    leaveOnEndCooldown: 500,
                    leaveOnEmptyCooldown: 500,
                    selfDeaf: true
                }
            });
    
            await interaction.followUp(`Add to queue : ${track.title} (${track.duration})`);
        } catch (except) {
            return await interaction.followUp(`The music ${song} was not found`);
        }
        
    }
};