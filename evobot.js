const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({intents : new Discord.IntentsBitField(3276799)});
require('dotenv').config();
const loadCommands = require("./loaders/loadCommands");
const loadEvent = require("./loaders/loadEvent");

client.commands = new Discord.Collection();


(async () => {
    await loadCommands(client);
    await loadEvent(client);
    await client.login(process.env.DISCORD_API_KEY);
})();