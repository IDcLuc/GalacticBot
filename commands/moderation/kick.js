const { MessageMentions } = require("discord.js")
const { Permissions } = require("discord.js")
const { MessageEmbed, Guild } = require("discord.js")

module.exports = {
    name: "kick", 
    category: "moderation",
    permissions: ["KICK_MEMBERS"], 
    devOnly: false, 
    run: async ({client, message, args}) => {
        if (!args[0]){
            let embede = new MessageEmbed()
            embede 
                .setTitle("Kick")
                .setDescription("Kick a member from the discord server.")
                .setColor("#863b87")
                .addFields(
                    { name: "Usage", value: "g!kick [member] [reason]"},
                    { name: "Example", value: "g!kick <@453943223229087748> Bullying"}
                )
                .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
            return message.reply({ embeds: [embede] })
        }
        let mention = args[0].match(MessageMentions.USERS_PATTERN)

        if(!mention)
            return message.reply(`First argument (_\`${args[0]}\`_) needs to be a member: g!kick @member123`)

        let member = message.mentions.members.first()
        
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            return message.reply(`You can't kick \`\`${member.user.username}\`\` as they have kick permissions.`)
        }
        
        let reason = args.slice(1).join(" ")
        
        try {
            if(args[1])
            await member.send(`You have been kicked from **${message.guild.name}** for *\`\`${reason}\`\`*!`)
            else if(!args[1])
            await member.send(`You have been kicked from **${message.guild.name}**!`)
            await member.kick({reason: reason})
            if(args[1])
            message.reply("<@" + member + "> has been kicked for ``" + reason +"``.")
            if(!args[1])
            message.reply("<@" + member + "> has been kicked.")
        }
        catch (err) {
            console.log (err)
            message.reply("An error occured while performing this action.")
        } 
    }
}