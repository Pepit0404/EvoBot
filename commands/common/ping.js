module.exports = {
    name: "ping",
    description: "Test command",

    async run(client, message) {
        message.reply("Pong !")
    }
};