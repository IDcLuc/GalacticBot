const { MessageEmbed } = require('discord.js');
const hypixel = require('../../builders/hypixelapi');
const fetch = require('node-fetch')

module.exports = {
    name: "skills",
    aliases: ['skill', 'skillavg', 'sa'],
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {   
        let plr = args[0]
        if (!plr) return message.reply("Please provide a player name.")
        function checkname(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.success);
        }
        const success = await checkname(plr)
        if(!success) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)

        function getUUID(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.data.player.raw_id)
        }; const playerID = await getUUID(plr)
        
        function playedSkyblock(playerUUID) {
            return fetch(`https://api.hypixel.net/skyblock/profiles?uuid=${playerUUID}&key=${process.env.apikey}`)
            .then(data => data.json())
            .then(player => player.profiles)
        }; const played = await playedSkyblock(playerID)
        if(played == null) return message.reply("This player doesn't have a skyblock profile!")


        const name = await hypixel.getPlayer(plr)
        hypixel.getSkyblockProfiles(plr).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            let lastprofile = profiles[0].profileName
/////////////////////////////////////////////////////////////////////////////////////
            function getProgress(skillName){
                const percentage = skillName.xpCurrent/skillName.xpForNext * 100
                return Math.round(percentage * 10) / 10
            }            

            hypixel.getSkyblockMember(plr).then(member => {
                const skills = member.get(lastprofile).skills
                const dungeons = member.get(lastprofile).dungeons.types
                const average = Math.round((skills.combat.level + skills.farming.level + skills.foraging.level + skills.mining.level + skills.enchanting.level + skills.alchemy.level + skills.fishing.level + skills.taming.level) / 8 * 100) / 100

                let embed = new MessageEmbed()
                    .setTitle(`${name}'s Skills`)
                    .setDescription(`Skill Average: **${average}** without progress`)
                    .setThumbnail(`https://crafatar.com/renders/body/${playerID}?overlay&size=128`)
                    .addFields(
                        { name: "Combat " + skills.combat.level, value: `Progress: **${getProgress(skills.combat)}%**`, inline: true },
                        { name: "Farming " + skills.farming.level, value: `Progress: **${getProgress(skills.farming)}%**`, inline: true },
                        { name: "Fishing " + skills.fishing.level, value: `Progress: **${getProgress(skills.fishing)}%**`, inline: true },
                        { name: "Mining " + skills.mining.level, value: `Progress: **${getProgress(skills.mining)}%**`, inline: true},
                        { name: "Foraging " + skills.foraging.level, value: `Progress: **${getProgress(skills.foraging)}%**`, inline: true },
                        { name: "Enchanting " + skills.enchanting.level, value: `Progress: **${getProgress(skills.enchanting)}%**`, inline: true },
                        { name: "Alchemy " + skills.alchemy.level, value: `Progress: **${getProgress(skills.alchemy)}%**`, inline: true },
                        { name: "Taming " + skills.taming.level, value: `Progress: **${getProgress(skills.taming)}%**`, inline: true },
                        { name: "Runecrafting " + skills.taming.level, value: `Progress: **${getProgress(skills.runecrafting)}%**`, inline: true },
                        { name: "Carpentry " + skills.taming.level, value: `Progress: **${getProgress(skills.carpentry)}%**`, inline: true },
                        { name: "Catacombs " + dungeons.catacombs.level, value: `Progress: **${getProgress(dungeons.catacombs)}%**`, inline: true },
                    )
                    .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
                message.reply({ embeds: [embed] }) 
            }).catch(e => {
                console.log(e)
                message.reply('An error occured while performing this action.')
            })                
        })
    }
}
