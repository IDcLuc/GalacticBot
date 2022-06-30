module.exports = {
    name: "prefix",
    aliases: ["pref"],
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.reply("The prefix for *``" + message.guild.name + "``* is *``g!``*.") 
    }
}