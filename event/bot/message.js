const {Events} = require("discord.js");
require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
    name: Events.MessageCreate,
    run(client, message) {
        if (!message.content.startsWith(prefix)) return;

        const arrayMessage = message.content.split(" "); 
        const commandName = arrayMessage[0].replace(prefix, "");
        const command = client.commands.get(commandName);

        try{
            command.run(client, message);
        } catch (e) {
            // pass
        }
    }
}