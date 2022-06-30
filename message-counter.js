const mongo = require("mongoose")
const schema = require("./schemas/rank/message-count-schema")

module.exports = client => {
    client.on('messageCreate', async (message) => {    

        if(message.author.bot) return
        if(message.channel.type === 'dm') return
        if(message.content.startsWith('g!')) return
        
        const messages = await message.channel.messages.fetch()
        const userMessages = await messages.filter(m => m.author.id === message.author.id)
        const userLastMessage = userMessages.first(2)[1]
        if (userLastMessage && Math.abs(userLastMessage.createdAt - message.createdAt) < 15000) return
        
        let member = message.author.id
        let dataQuery = await schema.findOne({ userID: member, guildID: message.guild.id })
        
        if (!dataQuery) {
            const newSchem = new schema(
                {
                    _id: mongo.Types.ObjectId(),
                    userID: member,
                    messageCount: 1,
                    guildID: message.guild.id
                },
                {
                    upsert: true
                }
            )
            await newSchem.save()
        }
        else {
            dataQuery.updateOne(
                {
                    messageCount: dataQuery.messageCount++
                },
                {
                    upsert: true
                }
            )
            await dataQuery.save()
        }
    })
}