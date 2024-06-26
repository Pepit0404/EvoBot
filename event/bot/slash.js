const { Events, InteractionType } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    
    async run(client, interaction) {
        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            await command.runSlash(interaction);
        };
    }
};