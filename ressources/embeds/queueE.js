const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle, BitField, APIEmbedField } = require("discord.js");

module.exports = {
    exportEmbed (queue, where) {
        return  { embeds: [Embed(queue, where)]};
    }
}

// possible to upgrade
Embed = function(queue, where) {
    let embed = new EmbedBuilder()
     .setColor(0x33A1FD)
     .setTitle("The queue")
     .setTimestamp();
    // .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL()});

    embed = field(queue, 0, embed);
    return embed;
}

field = function(queue, where, embed) {
    for (let i=where; i < queue.tracks.data.length; i++) { 
        embed.addFields({ 
            name: `In ${i+1} music:`, 
            value: `${queue.tracks.data[i].title} (${queue.tracks.data[i].duration} min) by ${queue.tracks.data[i].author}`
        });
    }
    return embed;
}
