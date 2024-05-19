const fs = require("fs");

module.exports = async client => {
    let count = 0;
    const dirsEvent = fs.readdirSync("./event/");

    for (const dir of dirsEvent) {
        const filesDirs = fs.readdirSync(`./event/${dir}/`).filter(f => f.endsWith(".js"));
        for (const file of filesDirs) {
            const event = require(`../event/${dir}/${file}`);
            client.on(event.name, (...args) => event.run(client, ...args));
            count ++;
        };
    };
    console.log(`[Load Events] => ${count} commands`);
}
