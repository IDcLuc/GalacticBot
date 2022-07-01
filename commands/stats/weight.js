const hypixel = require('../../hypixelapi');
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "weight",
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let plr = args[0];
        if (!plr) return message.channel.send(`Please provide a player name.`);

        //check if username is valid with playerdb api
        function checkName(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
            .then(data => data.json())
            .then(player => player.success)
        }; const valid = await checkName(plr)
        if(!valid) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)

        const playerID = await hypixel.getPlayer(plr).then(player => player.uuid);
        const playerName = await hypixel.getPlayer(plr)

        function playedSkyblock(playerUUID) {
            return fetch(`https://api.hypixel.net/skyblock/profiles?uuid=${playerUUID}&key=${process.env.apikey}`)
            .then(data => data.json())
            .then(player => player.profiles)
        }; const played = await playedSkyblock(playerID)
        if(played == null) return message.reply("This player doesn't have a skyblock profile!")

        
        hypixel.getSkyblockProfiles(plr).then((profiles) => {
            profiles.sort((a, b) => b.me.lastSaveTimestamp - a.me.lastSaveTimestamp)[0];
            hypixel.getSkyblockMember(plr).then(member => {
                const sbstat = member.get(profiles[0].profileName)

                function formatAndRound(num) {
                    return new Intl.NumberFormat('en-US').format(Math.round(num * 10) / 10)
                }

                //skills weight
                const skillWeights = {
                    farming: {
                        weight: String,
                        exponent: 1.217848139,
                        maxLevel: 60,
                        maxWeight: 2200
                    },
                    mining: {
                        weight: String,
                        exponent: 1.18207448,
                        maxLevel: 60,
                        maxWeight: 1750
                    },
                    combat: {
                        weight: String,
                        exponent: 1.15797687265,
                        maxLevel: 60,
                        maxWeight: 1500
                    },
                    foraging: {
                        weight: String,
                        exponent: 1.232826,
                        maxLevel: 50,
                        maxWeight: 850
                    },
                    fishing: {
                        weight: String,
                        exponent: 1.406418,
                        maxLevel: 50,
                        maxWeight: 2500
                    },
                    enchanting: {
                        weight: String,
                        exponent: 0.96976583,
                        maxLevel: 60,
                        maxWeight: 450
                    }, 
                    alchemy: {
                        weight: String,
                        exponent: 1.0,
                        maxLevel: 50,
                        maxWeight: 200
                    },
                    taming: {
                        weight: String,
                        exponent: 1.14744,
                        maxLevel: 50,
                        maxWeight: 500
                    },
                }

                function getLevel(name){
                    const decimals = (name.xpCurrent / name.xpForNext)
                    return name.level + decimals
                }

                function getSkillWeight(skillName){
                    let skill = skillWeights[skillName]
                    let level = getLevel(sbstat.skills[skillName])

                    if(level >= skill.maxLevel) return skillWeights[skillName].maxWeight
                    let weight = Math.pow(level * 10, 0.5 + skill.exponent + level / 100) / 1250
                    
                    return weight
                }
                let TotalSkillWeight = 0;
                for (const skillname in skillWeights) {
                    TotalSkillWeight = TotalSkillWeight + getSkillWeight(skillname)
                    skillWeights[skillname].weight = formatAndRound(getSkillWeight(skillname))
                }
                message.reply(`Total Skill Weight: ${formatAndRound(TotalSkillWeight)}`)
                //dungeon weight
                const dungeonWeights = {
                    catacombs: {
                        weight: String,
                        divider: 0.0002149604615,
                        maxLevel: 60,
                        maxWeight: 9500
                    }, 
                    healer: {
                        weight: String,
                        divider: 0.0000045254834,
                        maxWeight: 223
                    },
                    berserk: {
                        weight: String,
                        divider: 0.0000045254834,
                        maxWeight: 212
                    },
                    mage: {
                        weight: String,
                        divider: 0.0000045254834,
                        maxWeight: 211
                    },
                    archer: {
                        weight: String,
                        divider: 0.0000045254834,
                        maxWeight: 236
                    },
                    tank: {
                        weight: String,
                        divider: 0.0000045254834,
                        maxWeight: 210
                    }
                }
                function getDungeonWeight(dungeonName){
                    const dungeon = dungeonWeights[dungeonName]
                    const divider = dungeonWeights[dungeonName].divider
                    let level = dungeonName === "catacombs" ? getLevel(sbstat.dungeons.types[dungeonName]) : getLevel(sbstat.dungeons.classes[dungeonName])
                    if(level >= dungeon.maxLevel || level == Infinity) return dungeonWeights[dungeonName].maxWeight
                    
                    let weight = Math.pow(level, 4.5) * divider
                    return weight
                }
                let TotalDungeonWeight = 0;
                for (const type in dungeonWeights) {
                    TotalDungeonWeight = TotalDungeonWeight + getDungeonWeight(type)
                    dungeonWeights[type].weight = formatAndRound(getDungeonWeight(type))
                }
                message.reply(`Total Dungeon Weight: ${formatAndRound(TotalDungeonWeight)}`)

                //slayer weight
                const slayerWeights = {
                    zombie: {
                        weight: String,
                        divider: 2208,
                        maxWeight: 452.9
                    },
                    spider: {
                        weight: String,
                        divider: 2118,
                        maxWeight: 472.1
                    },
                    wolf: {
                        weight: String,
                        divider: 1962,
                        maxWeight: 509.7
                    },
                    enderman: {
                        weight: String,
                        divider: 1430,
                        maxWeight: 699.3
                    },
                };
                  
                function getSlayerWeight(slayerName){
                    const slayer = slayerWeights[slayerName]
                    const divider = slayerWeights[slayerName].divider
                    
                    let weight = sbstat.slayer[slayerName].xp / divider
                    if (weight >= slayer.maxWeight) return slayer.maxWeight
                    return weight
                }

                let TotalSlayerWeight = 0;
                for (const slayerName in slayerWeights) {
                    TotalSlayerWeight = TotalSlayerWeight + getSlayerWeight(slayerName)
                    slayerWeights[slayerName].weight = formatAndRound(getSlayerWeight(slayerName))
                }
                TotalDungeonWeight = formatAndRound(TotalDungeonWeight)
                TotalSkillWeight = formatAndRound(TotalSkillWeight)
                TotalSlayerWeight = formatAndRound(TotalSlayerWeight)
                TotalWeight = formatAndRound(TotalDungeonWeight + TotalSkillWeight + TotalSlayerWeight)

                function between(min, max, num){
                    return num >= min && num <= max
                }

                let stage = String;
                switch (true) {
                    case between(2000, 7000, parseFloat(TotalWeight)):
                        stage = "Mid Game"
                    break;
                    case between(7000, 10000, parseFloat(TotalWeight)):
                        stage = "Late Game";
                    break;
                    case between(10000, 15000, parseFloat(TotalWeight)):
                        stage = "Early End";
                    break;
                    case between(15000, 30000, parseFloat(TotalWeight)):
                        stage = "End Game"; 
                    break;
                    case TotalWeight >= 30000:
                        stage = "What_the_fuck Game";
                    break;
                    default: stage = "Early Game";
                }
                message.reply(`Total Slayer Weight: ${formatAndRound(TotalSlayerWeight)}`)
                const weightEmbed = new MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`${playerName} Senither Weight on ${profiles[0].profileName}`)
                    .setURL(`https://sky.shiiyu.moe/stats/${plr}`)
                    .setThumbnail(`https://crafatar.com/renders/body/${playerID}?overlay&size=128`)
                    .setDescription(`Total: **${TotalWeight}**\n Stage: **${stage}**`)
                    .addFields(
                        { 
                            name: `<:diamond_sword:979322481678639124> Skills: ${totalSkillWeight}`,
                            value: `
                               ➜ Farming: **${skillWeights.farming.weight}**
                               ➜ Mining: **${skillWeights.mining.weight}**
                               ➜ Combat: **${skillWeights.combat.weight}**
                               ➜ Foraging: **${skillWeights.foraging.weight}**
                               ➜ Fishing: **${skillWeights.fishing.weight}**
                               ➜ Enchanting: **${skillWeights.enchanting.weight}**
                               ➜ Alchemy: **${skillWeights.alchemy.weight}**
                               ➜ Taming: **${skillWeights.taming.weight}**
                            `
                        },
                        {
                            name: `<:catacombs:979377305073877072> Dungeons: ${totalDungeonWeight}`,
                            value: `
                               ➜ Catacombs: **${dungeonWeights.catacombs.weight}**
                               ➜ Healer: **${dungeonWeights.healer.weight}**
                               ➜ Berserker: **${dungeonWeights.berserk.weight}**
                               ➜ Mage: **${dungeonWeights.mage.weight}**
                               ➜ Archer: **${dungeonWeights.archer.weight}**
                               ➜ Tank: **${dungeonWeights.tank.weight}**
                            `
                        },
                        {
                            name: `<:slayer:979377305073877072> Slayer: ${totalSlayerWeight}`,
                            value: `
                               ➜ Zombie: **${slayerWeights.zombie.weight}**
                               ➜ Spider: **${slayerWeights.spider.weight}**
                               ➜ Wolf: **${slayerWeights.wolf.weight}**
                               ➜ Enderman: **${slayerWeights.enderman.weight}**
                            `
                        }
                    )
                    .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
                message.reply({ embeds: [weightEmbed] })
            }).catch(e => {
                console.log(e)
                message.reply('An error occured. Is your API public?')
            })  
        })
    }
}