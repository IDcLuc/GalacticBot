const { MessageEmbed } = require('discord.js')
const { MessageMentions } = require("discord.js")
const { Permissions } = require("discord.js")

module.exports = {
    name: "timeout",
    category: "moderation",
    permissions: ['MODERATE_MEMBERS'],
    devOnly: false,
    run: async ({client, message, args}) => {
        if (!args[0]){
        let embed = new MessageEmbed()
        embed
            .setTitle("Timeout")
            .setDescription("Time someone out.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!timeout [member] []"},
                { name: "Example", value: "g!mute <@453943223229087748> Excessive usage of bad words"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        return message.reply({ embeds: [embed] })
        }

        let mention = args[0].match(MessageMentions.USER_PATTERN)

        if (!mention)
            return message.reply(`First argument (_\`${args[0]}\`_) needs to be a member: g!kick @member123`)

        let member = message.mentions.members.first()
        let role = message.guild.roles.cache.find(r => r.name === "Muted noob");
        if (!member.permissions) return message.reply(".")
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS) && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            return message.reply(`You can't mute \`\`${member.user.username}\`\` as they have kick permissions.`)
        }

        let reason = args.slice(1).join(" ")
        try {
            if(args[1])
            await member.send(`You have been muted from **${message.guild.name}** for *\`\`${reason}\`\`*!`)
            else if(!args[1])
            await member.send(`You have been muted from **${message.guild.name}**!`)
            await member.roles.add(role)
            if(args[1])
            message.reply("<@" + member + "> has been muted for ``" + reason +"``.")
            if(!args[1])
            message.reply("<@" + member + "> has been muted.")
        } catch (err) {
            console.log (err)
            message.reply("An error occured while performing this action.")
        }
    }
}


