const fs = require("fs");

module.exports = client => {
    let count = 0;
    const dirsEvent = fs.readdirSync("./event/");

    for (const dir of dirsEvent) {
        const filesDirs = fs.readdirSync(`./event/${dir}/`).filter(f => f.endsWith(".js"));
        for (const file of filesDirs) {
            const event = require(`../event/${dir}/${file}`);

            if (dir === "music") client.player.events.on(event.name, (...args) => event.run(client, ...args));
            else client.on(event.name, (...args) => event.run(client, ...args));
            count ++;
        };
    };
    console.log(`[Load Events] => ${count} commands`);
}
