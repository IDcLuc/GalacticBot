// const schema = require('../../schemas/rank/message-count-schema')
// const cardtype = require('../../schemas/rank/cardtype')

// const { MessageEmbed } = require('discord.js')

// const progressBar = require('../../builders/progressBar')
// const rankCard = require('../../builders/rankCard')

// const levelRequirements = [ 1, 10, 20, 40, 70, 110, 160, 220, 290, 370, 460, 560, 670, 790, 910, 1040, 1180, 1330, 1490, 1660, 1840, 2040, 2240, 2450, 2670, 2900, 3130, 3370, 3620, 3880, 4150, 4430, 4720, 5020, 5330, 5650, 5980, 6320, 6670, 7030, 7400, 7780, 8170, 8570, 8980, 9400, 9830, 10270, 10720, 11180, 11650, 12130, 12620, 13120, 13630, 14150, 14670, 15200, 15730, 16270, 16820, 17370, 17930, 18500, 19070, 19640, 20220, 20800, 21400, 22010, 22600, 23210, 23820, 24440, 25060, 25680, 26300, 26920, 27540, 28160, 28780, 29400, 30020, 30640, 31260, 31880, 32500, 33120, 33740, 34360, 34980, 35600, 36220, 36840, 37460, 38080, 38700, 39320, 39940, 40560, 41180, 41800, 42420, 43040, 43660, 44280, 44800, 45420, 46040, 46660, 47280, 47900, 48520, 49140, 49760, 50380, 51000, 51620, 52240, 52860, 53480, 54100, 54720, 55340, 55960, 56580, 57200, 57820, 58440, 59060, 59680, 60300, 60920, 61540, 62160, 62780, 63400, 64020, 64640, 65260, 65880, 66500, 67120, 67740, 68360, 68980, 69600, 70220, 70840, 71460, 72080, 1000000000000000]

// module.exports = {
//     name: "rank",
//     aliases: ['level'],
//     cooldown: 3,
//     category: "rank",
//     permissions: [],
//     devOnly: false,
//     run: async ({client, message, args}) => {
//         var member = message.mentions.members.first() ? message.mentions.members.first() : !args[0] ? message.member : message.guild.members.cache.has(`${args[0]}`) ? message.guild.members.cache.get(`${args[0]}`) : message.member

//         const cardType = await cardtype.findOne({ userID: message.author.id })
//         const dataQuery = await schema.findOne({ userID: member.id, guildID: message.guild.id })
        
//         if(cardType?.cardType === 'image') {
//             if (dataQuery) {
//                 const msgcount = dataQuery.messageCount

//                 for (let index in levelRequirements) {
//                     if(between(msgcount, levelRequirements[index], levelRequirements[++index])) {
//                         let level = Math.abs(index - 1)
//                         const nextLevel = Math.abs(levelRequirements[index] - levelRequirements[--index])
//                         const card = await rankCard(member, level, Math.abs(msgcount - levelRequirements[index]), nextLevel)
//                         message.reply({ files: [card] })
//                     }
//                 }
//             }
//             else if (!dataQuery) {
//                 const lvl0card = await rankCard(member, 0, 0, 10)
//                 message.reply({ files: [lvl0card] })
//             }
//         }
//         else if(cardType?.cardType === 'embed') {
//             if (dataQuery) {
//                 const msgcount = dataQuery.messageCount

//                 for (let index in levelRequirements) {
//                     if(between(msgcount, levelRequirements[index], levelRequirements[++index])) {
//                         const percent = Math.floor((msgcount / levelRequirements[++index]) * 100)
//                         const nextReq = Math.abs(levelRequirements[++index] - msgcount)
//                         const progressbar = progressBar(msgcount, levelRequirements[++index], 20)
//                         let level = Math.abs(index - 1)
//                         const nextLevel = levelRequirements[++index]

//                         const embed = new MessageEmbed()
//                             .setColor('#0099ff')
//                             .setTitle(`${member.user.username}#${member.user.discriminator}'s level`)
//                             .addFields(
//                                 { name: 'Level', value: `${level}`, inline: true },
//                                 { name: 'Messages:', value: `${msgcount}`, inline: true },
//                                 { name: 'Next Level in:', value: `${nextReq}`, inline: true },
//                                 { name: 'Progress:', value: `${percent}% | ${msgcount}/${levelRequirements[++index]}\n${progressbar}`, inline: true }
//                             )
//                             .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
//                             .setThumbnail(message.author.displayAvatarURL())
//                         message.channel.send({ embeds: [embed] })
//                     }
//                 }
//             }
//         }
//         else {
//             if (dataQuery) {
//                 const msgcount = dataQuery.messageCount

//                 function between(num, min, max) { 
//                     return num >= min && num < max;
//                 } 
//                 for (let index in levelRequirements) {
//                     if(between(msgcount, levelRequirements[index], levelRequirements[++index])) {
//                         let level = index
//                         const nextLevel = levelRequirements[++index]
//                         const card = await rankCard(member, level, msgcount, nextLevel)
//                         message.reply({ files: [card] })
//                     }
//                 }
//             }
//             else {
//                 const lvl0card = await rankCard(member, 0, 0, 10)
//                 message.reply({ files: [lvl0card] })
//             }
//         } 

//         function between(num, min, max) { 
//             return num >= min && num < max;
//         } 
//     }
// }
