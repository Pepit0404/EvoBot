const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({intents : new Discord.IntentsBitField(3276799)});
require('dotenv').config();
const loadCommands = require("./loaders/loadCommands")

client.commands = new Discord.Collection();
loadCommands(client);
const prefix = process.env.PREFIX;

client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix)) return;

    const name = message.content.split(" ")[0].replace(prefix, "");
    const command = client.commands.get(name);

    command.run(client, message);
});

client.login(process.env.DISCORD_API_KEY);