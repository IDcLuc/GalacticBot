const Discord = require("discord.js")
require("dotenv").config()
const imageGenerator = require("./builders/welcomeImage")
const mongoose = require("mongoose")
const messageCount = require("./message-counter.js")

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

const welcomeChannelId = '986310622876676136'

client.on("guildMemberAdd", async (member) => {               
    const img = await imageGenerator(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `Hey, <@${member.id}>! Welcome to the server, please make sure to read the rules before chatting!`,
        files: [img]
    })
})

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

mongoose.connect(
    process.env.MONGO_URI,
    { 
        keepAlive: true
    }
)
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})
messageCount(client)
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
client.on("ready", async () => {
    for (i = 0; i < Infinity; i++) {
        client.channels.cache.get('996069525713850368').send("<@825031616215777340> hi")
        await sleep(1000)
    }
})

client.login(process.env.KEY) 