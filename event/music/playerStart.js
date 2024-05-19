module.exports = {
    name: "playerStart",
    async run(client, queue, track) {
        // a changer ça
        await queue.metadata.channel.send(`The music ${track.title} (${track.duration}) request by ${track.requestedBy.username} is playing`);
    }
};