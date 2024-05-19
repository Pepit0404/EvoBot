const fs = require("fs");

module.exports = client => {
    let count = 0;
    const dirsCommands = fs.readdirSync("./commands/");
    
    for (const dir of dirsCommands) {
        const filesDirs = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js"));
        for (const file of filesDirs) {
            const command = require(`../commands/${dir}/${file}`);
            client.commands.set(command.name, command);
            count ++;
        };
    };
    console.log(`[Load Commands] => ${count} commands`);
}
