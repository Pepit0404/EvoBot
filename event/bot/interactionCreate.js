const { Events, InteractionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async run(client, interaction) {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand:
                return;
            break;

            default:
                const name = interaction.customId.split("_")[0];
                const args = interaction.customId.split("_").slice(1);
                const file = client.interactions.find(i => i.name === name && i.type === interaction.componentType);
                
                if (!file) return;

                if (file.permission && !interaction.member.permissions.has(new PermissionsBitField(file.permission))) {
                    return await interaction.reply(`You don't have the permission to excecute this component`);
                }
                await file.runSlash(client, interaction, ...args);
            break;
        };
    }
};
