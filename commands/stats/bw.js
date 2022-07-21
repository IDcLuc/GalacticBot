const { MessageEmbed } =  require('discord.js')
const hypixel = require('../../builders/hypixelapi');
const fetch = require('node-fetch')
module.exports = {
    name: "bw",
    aliases: ["bedwars"],
    category: "stats",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let plr = args[0];
        if (!plr) return message.channel.send(`Please provide a player name.`);

        function getId(player) {
            return fetch(`https://playerdb.co/api/player/minecraft/${player}`)
              .then(data => data.json())
              .then(player => player.success);
        } const id = await getId(plr)
        if(!id) return message.reply(`\`${plr}\` isn't a valid minecraft username!`)
  
        let playerObj = await hypixel.getPlayer(plr)
        let bedWarsStats = playerObj.stats.bedwars 

        let embed = new MessageEmbed() 
            .setTitle(`${playerObj}'s Bedwars Stats`)
            .setThumbnail(`https://crafatar.com/renders/body/${playerObj.uuid}?overlay&size=256`)
            .addFields(
                { name: "Level", value: new Intl.NumberFormat("en-US").format(bedWarsStats.level), inline: true },
                { name: "Coins", value: new Intl.NumberFormat("en-US").format(bedWarsStats.coins), inline: true },
                { name: "Kills", value: new Intl.NumberFormat("en-US").format(bedWarsStats.kills) , inline: true },
                { name: "Deaths", value: new Intl.NumberFormat("en-US").format(bedWarsStats.deaths), inline: true },
                { name: "Final Kills", value: new Intl.NumberFormat("en-US").format(bedWarsStats.finalKills), inline: true },
                { name: "Final Deaths", value: new Intl.NumberFormat("en-US").format(bedWarsStats.finalDeaths), inline: true },
                { name: "Wins", value: new Intl.NumberFormat("en-US").format(bedWarsStats.wins) , inline: true },
                { name: "Losses", value: new Intl.NumberFormat("en-US").format(bedWarsStats.losses), inline: true },
                { name: "K/D Ratio", value: new Intl.NumberFormat("en-US").format(bedWarsStats.KDRatio) , inline: true },
                { name: "FK/D Ratio", value: new Intl.NumberFormat("en-US").format(bedWarsStats.finalKDRatio), inline: true},
                { name: "W/L Ratio", value: new Intl.NumberFormat("en-US").format(bedWarsStats.WLRatio), inline: true},
            )
            .setFooter({ text: `Galactic Bot Stats ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })


        message.reply({embeds: [embed]});
    }
}