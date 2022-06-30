const Discord = require("discord.js")
const cooldowns = new Map()
module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot

        if (!message.guild) return
        
        if (message.author.bot) return

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr) || client.commands.find(a => a.aliases && a.aliases.includes(cmdstr))

        if (!command) return

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection())
    }       

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown) * 1000

    if(timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if(now < expirationTime && !owners.includes(message.author.id)){
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds to use this command.`)
        }
    }

    timestamps.set(message.author.id, now)

        let member = message.member

        if (command.devOnly && !owners.includes(member.id)){
            return message.reply("Only the bot owner can use this command!")
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0){
            return message.reply("You do not have permissions to use this command. You need the " + command.permissions + " permission to use this command!")
        }

        try {
            await command.run({...bot, message, args})
        }
        catch (err) {
            let errMsg = err.toString()

            if (errMsg.startsWith("?")) {
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            }
            else
                console.error(err)
        }
    }
}