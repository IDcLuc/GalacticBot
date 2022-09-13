module.exports = {
    name: "ping",
    aliases: ["pong"], 
    category: "misc",
    permissions: [], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        const msg = await message.channel.send("Pinging...");
        let APIping = client.ws.ping
        let botPing = Math.abs(message.createdTimestamp - msg.createdTimestamp)
        setTimeout(() => {
            msg.edit(`Pong!\nAPI latency: \`${APIping}ms\` \nBot message response latency: \`${botPing}ms\``)
        }, 500)
    }
}
