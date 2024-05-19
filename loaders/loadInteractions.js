const fs = require("fs")

module.exports = client => {
    let count = 0;
    const dirsInteractions = fs.readdirSync("./interactions/");
    
    for (const dir of dirsInteractions) {
        const filesDirs = fs.readdirSync(`./interactions/${dir}/`).filter(f => f.endsWith(".js"));
        for (const file of filesDirs) {
            const interaction = require(`../interactions/${dir}/${file}`);
            client.interactions.set(interaction.name, interaction);
            count ++;
        };
    };
    console.log(`[Load interactions] => ${count} interactions`);
}