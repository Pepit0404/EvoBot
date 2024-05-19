const {Events, ActivityType} = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    async run(client) {
        client.application.commands.set(client.commands.map(command => command.data));

        client.user.setActivity("le néant", {type: ActivityType.Watching});

        console.log("\x1b[32m", `\n ${client.user.username} is online\n`, "\x1b[37m");
    }
};