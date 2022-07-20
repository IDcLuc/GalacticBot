module.exports = {
    name: "destroy",
    aliases: ["stop", "logout"],
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        if (args[0] && args[0] === "fugaltic") {
            client.destroy()
        }
        else message.reply('no im gonna destroy u b**ch')
    }
}