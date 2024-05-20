const {Events, ActivityType} = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    async run(client) {
        client.application.commands.set(client.commands.map(command => command.data));

        client.user.setActivity("a DJ set", {type: ActivityType.Watching});

        console.log("\x1b[32m", `\n[${client.user.username} online]\n`, "\x1b[37m");
    }
};