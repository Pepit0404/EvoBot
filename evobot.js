const fs = require("fs");
const Discord = require("discord.js");
const { Player } = require("discord-player");
const client = new Discord.Client({intents : new Discord.IntentsBitField(3276799)});
require('dotenv').config();

const loadCommands = require("./loaders/loadCommands");
const loadEvents = require("./loaders/loadEvents");
const loadInteractions = require("./loaders/loadInteractions")

client.commands = new Discord.Collection();
client.interactions = new Discord.Collection();
client.player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});
client.player.extractors.loadDefault();

(async () => {
    loadCommands(client);
    loadEvents(client);
    loadInteractions(client);
    await client.login(process.env.DISCORD_API_KEY);
})();