const { ComponentType } = require("discord.js");

module.exports = {
    name: "skip",
    type: ComponentType.Button,

    async runSlash(client, interaction) {
        const file = client.commands.find(i => i.name === "skip");
        await file.runSlash(interaction);
    }
}
