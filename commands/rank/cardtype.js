const mongoose = require('mongoose');
const typeSchema = require('../../schemas/rank/cardtype.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "cardtype",
    aliases: ['card'],
    cooldown: 10,
    category: "rank",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const typeembed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Card Type')
        .setDescription('Toggle between image and embed for the rank card. Default is image which takes longer to render than embed.')
        .addFields(
            { name: 'Usage', value: 'g!cardtype [image/embed]' },
            { name: 'Example', value: 'g!cardtype image' }
        )
        .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let type = args[0]
        if (!type) return message.reply({ embeds: [typeembed] })

        var member = message.member
        let dataQuery = await typeSchema.findOne({ userID: member.id })
        
        if (type === 'embed' || type === 'image') {
            if (!dataQuery) {
                const newSchem = new typeSchema(
                    {
                        _id: mongoose.Types.ObjectId(),
                        userID: member.id,
                        cardType: `${args[0]}`
                    },
                    {
                        upsert: true
                    }
                )
                await newSchem.save()
                message.reply(`Your card type has been set to \`${type}\``)
            }
            else{
                await dataQuery.updateOne(
                    { 
                        cardType: `${args[0]}`
                    },
                    {
                        upsert: true
                    }
                )
                message.reply(`Your card type has been set to \`${type}\``)
            }
        }
        else {
            message.reply({ embeds: [typeembed] })
        }
    }
}