const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const name = "ping";
const description = "Test command"

module.exports = {
    name: name,
    description: description,
    data: new SlashCommandBuilder()
     .setName(name)
     .setDescription(description)
     .setDMPermission(true)
     .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    
    async run(client, message) {
        await message.reply("Pong !");
    },

    async runSlash(interaction, args) {
        await interaction.reply("Pong !");
    }
};