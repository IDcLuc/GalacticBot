const { MessageMentions } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "namemc",
    category: "search",
    aliases: ["nmc"],
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        if (!args[0]){
            let embed = new MessageEmbed()
            embed
                .setTitle("NameMC")
                .setDescription("Searches a username on NameMC.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!namemc [username]"},
                    { name: "Alias", value: "g!nmc"},
                    { name: "Example", value: "g!namemc MajorX500\ng!nmc IDcLuc"}
                )
                .setFooter({ text: `Galactic Bot by IDcLuc ● Requested by ${message.author.tag}`, iconURL: "https://cdn.discordapp.com/avatars/952178870646366248/387f44e15d6eb3d51d5ebeddf0503937.webp?size=240"})
            return message.reply({ embeds: [embed] })            
        }
        
        if (args[1])
        return message.reply("You can only include one argument (username) in this command!")

        message.reply(`Here you go! https://namemc.com/search?q=${args[0]}`)

    }

}