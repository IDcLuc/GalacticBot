const { MessageEmbed } =  require('discord.js')
const hypixel = require('../../hypixelapi');
const fetch = require('node-fetch')

module.exports = {
    name: "sw",
    aliases: ["skywars"],
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let plr = args[0];

        if (!plr) return message.channel.send(`Please provide a player name.`);
        
        function checkName(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${plr}`)
            .then(data => data.json())
            .then(player => player.success);
        }
          const id = await checkName(plr)
          if(id == false) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)

        let playerObj = await hypixel.getPlayer(plr)
        let stats = playerObj.stats.skywars
        let embed = new MessageEmbed()  
            .setTitle(`${playerObj}'s Skywars Stats`)
            .setThumbnail(`https://crafatar.com/renders/body/${playerObj.uuid}?overlay&size=128`)
            .addFields(
                { name: "Level", value: stats.level.toString(), inline: true },
                { name: "Kills", value: stats.kills.toString(), inline: true },
                { name: "Wins", value: stats.wins.toString(), inline: true},
                { name: "Losses", value: stats.losses.toString(), inline: true },
                { name: "Deaths", value: stats.deaths.toString(), inline: true },
                { name: "Coins", value: stats.coins.toString(), inline: true },
                { name: "K/D Ratio", value: stats.KDRatio.toString(), inline: true},
                { name: "W/L Ratio", value: stats.WLRatio.toString(), inline: true},
            )
            .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.avatarURL() })
        return message.reply({embeds: [embed]});
    }
}
