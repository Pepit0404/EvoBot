const { ComponentType } = require("discord.js");

module.exports = {
    name: "reset",
    type: ComponentType.Button,

    async runSlash(client, interaction) {
        const file = client.commands.find(i => i.name === "reset");
        await file.runSlash(interaction);
    }
}
