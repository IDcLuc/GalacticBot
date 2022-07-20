module.exports = {
    name: "destroy",
    aliases: ["stop", "logout"],
    category: "misc",
    permissions: [],
    devOnly: true,
    run: async ({client, message, args}) => {
        await message.channel.send("Logging out...").then(msg => msg.edit('Logging out..')).then(msg => msg.edit('Logging out...')).then(msg => msg.edit('Logging out..')).then(msg => msg.edit('Logging out...')).then(msg => msg.edit('Logged out.'))
        await client.destroy()
        console.log("Client logged out.")
    }
}