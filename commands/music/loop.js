const { useQueue, QueueRepeatMode } = require("discord-player");
const { SlashCommandBuilder, PermissionFlagsBits, transformResolved } = require("discord.js");

const name = "loop";
const description = "Loop ont the queue or on the track"

module.exports = {
    name: name,
    description: description,
    data: new SlashCommandBuilder()
     .setName(name)
     .setDescription(description)
     .setDMPermission(false)
     .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
     .addStringOption(opt => opt
         .setName("option")
         .setDescription("The thing to loop")
         .setRequired(true)
         .addChoices([{name: "track", value: "track" }, {name: "queue", value: "queue"}])
     ),
    
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

        const option = interaction.options.getString("option");
        if (option !== "track" && option !== "queue") {
            return await interaction.followUp(`The option ${option} is not possible`);
        }

        switch (queue.repeatMode){
            case 0: // 0 is for disable
                if (option === "track"){
                    queue.setRepeatMode(QueueRepeatMode.TRACK); 
                    await interaction.reply(`Loop on the current track`);
                } else {
                    queue.setRepeatMode(QueueRepeatMode.QUEUE); 
                    await interaction.reply(`Loop on the entire queue`);
                }
                break;
            case 1: // 1 is for on current track
                if (option === "track") {
                    queue.setRepeatMode(QueueRepeatMode.OFF); 
                    await interaction.reply(`The loop on the track has been remove`);
                } else {
                    queue.setRepeatMode(QueueRepeatMode.QUEUE); 
                    await interaction.reply(`Loop on the entire queue`);
                }
                break;
            case 2: // 2 is for queue
                if (option === "track"){
                    queue.setRepeatMode(QueueRepeatMode.TRACK); 
                    await interaction.reply(`Loop on the current track`);
                } else {
                    queue.setRepeatMode(QueueRepeatMode.OFF); 
                    await interaction.reply(`The loop on the queue has been remove`);
                }
                break;
        };
    }
};