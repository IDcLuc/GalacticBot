const MessageEmbed = require('discord.js');

module.exports = {
    name: "suggest",
    aliases: ["suggestion"],
    cooldown: 300,
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const suggestionsChannel = client.channels.cache.get("983133489773813790")
        let suggestembed = new MessageEmbed()
        suggestembed
            .setTitle("Suggest")
            .setDescription("Suggest a feature for the bot.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!suggest [suggestion]"},
                { name: "Alias", value: "g!suggestion"},
                { name: "Example", value: "g!suggest Add a networth command kid smh\ng!suggestion Get better response time smh"},
            )
            .setFooter({ text: `Galactic Bot by IDcLuc ● Requested by ${message.author.tag}`, iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})
        if (!args[0]) return message.reply({ embeds: [suggestembed] })
        const suggestion = args.slice(0).join(" ")
        const suggested = new MessageEmbed()
            .setTitle("Suggestion")
            .setDescription(suggestion)
            .setColor("#863b87")
            .setFooter({ text: `Suggested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true })})
        suggestionsChannel.send({ embeds: [suggested], content: "<@495514555615543329>" })
        message.reply("Your suggestion has been sent to the bot contributors.")
    }
}