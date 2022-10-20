const Discord = require("discord.js")
require("dotenv").config()
const imageGenerator = require("./builders/welcomeImage")
const mongoose = require("mongoose")
const messageCount = require("./builders/message-counter.js")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "g!",
    owners: ["495514555615543329"]
}


client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

// mongoose.connect(
//     process.env.MONGO_URI,
//     { 
//         keepAlive: true
//     }
// )
// mongoose.connection.on("connected", () => {
//     console.log("Connected to MongoDB")
// })

client.login(process.env.KEY) 
