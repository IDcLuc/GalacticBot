const { MessageMentions } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { Permissions } = require("discord.js")

module.exports = {
    name: "ban", 
    category: "moderation",
    permissions: ["BAN_MEMBERS"], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        let embede = new MessageEmbed()
        embede 
            .setTitle("Ban")
            .setDescription("Ban a member from the discord server.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!ban [member] [reason]"},
                { name: "Example", value: "g!ban <@453943223229087748> Raiding"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
                if (!args[0]) return message.reply({ embeds: [embede] })

        let mention = args[0].match(MessageMentions.USERS_PATTERN)

        if(!mention)
            return message.reply(`First argument (_\`${args[0]}\`_) needs to be a member: g!ban @member123`)
        
        let member = message.mentions.members.first()

        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
            return message.reply(`You can't ban \`\`${member.user.username}\`\` as they have kick permissions.`)
        

        let reason = args.slice(1).join(" ")
    
        try {
            if(args[1])
            await member.send(`You have been banned from **${message.guild.name}** for *\`\`${reason}\`\`*!`)
            else if(!args[1])
            await member.send(`You have been banned from **${message.guild.name}**!`)
            await member.ban({reason: reason})
            if(args[1])
            message.reply("<@" + member + "> has been banned for ``" + reason +"``.")
            if(!args[1])
            message.reply("<@" + member + "> has been banned.")
        }
        catch (err) {
            console.log (err)
            message.reply("An error occured while performing this action.")
        } 
    }
}