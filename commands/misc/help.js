const { MessageEmbed, Guild } = require("discord.js")

module.exports = {
    name: "help",
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const cmdname = args[0]

        let defaultembed = new MessageEmbed()
        defaultembed
            .setColor('#863b87')
            .setTitle('Help')
            .setDescription(`The prefix for **${message.guild.name}** is **"g!"**. Use g!help [command] to get info about a specific command.`)
            .addFields(
                { name: "Misc", value: "help, ping, prefix, suggest" },
                { name: "Moderation", value: "kick, ban, timeout"},
                { name: "Fun", value: "pikachu, cat, dog, confirmbald, fox, meme"},
                { name: "Search", value: "namemc, skycrypt"},
                { name: "Stats", value: "bedwars, skywars, skills, weight"},
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
            
        let kickembed = new MessageEmbed() 
        kickembed 
            .setTitle("Kick")
            .setDescription("Kick a member from the discord server.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!kick [member] [reason]"},
                { name: "Example", value: "g!kick <@453943223229087748> Bullying"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let banembed = new MessageEmbed()
        banembed
            .setTitle("Ban")
            .setDescription("Ban a member from the discord server.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!ban [member] [reason]"},
                { name: "Example", value: "g!ban <@453943223229087748> Raiding"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        
        let muteembed = new MessageEmbed()
        muteembed
            .setTitle("Mute")
            .setDescription("Mute a member from the discord server.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!mute [member] [reason]"},
                { name: "Example", value: "g!mute <@453943223229087748> Excessive usage of bad words"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        let suggestembed = new MessageEmbed()
        suggestembed
            .setTitle("Suggest")
            .setDescription("Suggest a feature for the bot.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!suggest [suggestion]"},
                { name: "Alias", value: "g!suggestion"},
                { name: "Example", value: "g!suggest Add a networth command\ng!suggestion Get better response time smh"},
            )
            .setFooter({ text: `Galactic Bot by IDcLuc ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let pingembed = new MessageEmbed()
        pingembed
            .setTitle("ping")
            .setDescription("Shows the response time (latency) of the bot API.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!ping"},
                { name: "Alias", value: "g!pong"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let prefixembed = new MessageEmbed()
            .setTitle("ping")
            .setDescription("Shows the prefix of the bot for this server.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!prefix"},
                { name: "Alias", value: "g!pref"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let nmcembed = new MessageEmbed()
        nmcembed
            .setTitle("NameMC")
            .setDescription("Searches a username on NameMC.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!namemc [username]"},
                { name: "Alias", value: "g!nmc"},
                { name: "Example", value: "g!namemc MajorX500 \n g!nmc IDcLuc"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
            
        let statsembed = new MessageEmbed()
        statsembed
            .setTitle("SkyCrypt")
            .setDescription("Sends a link to the SkyCrypt page for the username requested.")
            .setColor("#863b87")
            .addFields(
                { name: "Usage", value: "g!skycrypt [username]"},
                { name: "Alias", value: "g!sb \n g!stats"},
                { name: "Example", value: "g!skycrypt MajorX500 \n g!sb IDcLuc \n g!stats Observin"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})    
        
        let baldembed = new MessageEmbed()
        baldembed
            .setTitle("Confirmbald")
            .setDescription("Confirms someone's baldness.")
            .addFields(
                { name: "Usage", value: "g!baldconfirm [name]"},
                { name: "Alias", value: "g!bald \n g!confirmbald"},
                { name: "Example", value: "g!baldconfirm Major \n g!bald Majorx500 \n g!confirmbald <@794258833924292608>"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let bwembed = new MessageEmbed()
        bwembed
            .setTitle("BedWars")
            .setDescription("Gets someone's BedWars stats.")
            .addFields(
                { name: "Usage", value: "g!bedwars [username]"},
                { name: "Alias", value: "g!bw"},
                { name: "Example", value: "g!bedwars Majorx500 \n g!bw IDcLuc"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        let swembed = new MessageEmbed()
        swembed
            .setTitle("SkyWars")
            .setDescription("Gets someone's SkyWars stats.")
            .addFields(
                { name: "Usage", value: "g!skywars [username]"},
                { name: "Alias", value: "g!sw"},
                { name: "Example", value: "g!skywars Majorx500 \n g!sw IDcLuc"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let skillsembed = new MessageEmbed()
        skillsembed
            .setTitle("Skills")
            .setDescription("Gets someone's skills.")
            .addFields(
                { name: "Usage", value: "g!skills [username]"},
                { name: "Alias", value: "g!skill\ng!sa\ng!skillavg"},
                { name: "Example", value: "g!skills Majorx500 \n g!skill IDcLuc"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        let weightembed = new MessageEmbed()
        weightembed
            .setTitle("Weight")
            .setDescription("Gets someone's senither weight.")
            .addFields(
                { name: "Usage", value: "g!weight [username]"},
                { name: "Example", value: "g!weight IDcLuc"}
            )
            .setFooter({ text: `Galactic Bot ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        
        let catembed = new MessageEmbed()
        catembed
            .setTitle("Cat")
            .setDescription("Gets a random cat image.")
            .addFields(
                { name: "Usage", value: "g!cat"},
            )
            .setFooter({ text: `Galactic Bot ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        
        let dogembed = new MessageEmbed()
        dogembed
            .setTitle("Dog")
            .setDescription("Gets a random dog image.")
            .addFields(
                { name: "Usage", value: "g!dog"},
            )
            .setFooter({ text: `Galactic Bot ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let foxembed = new MessageEmbed()
        foxembed
            .setTitle("Fox")
            .setDescription("Gets a random fox image.")
            .addFields(
                { name: "Usage", value: "g!fox"},
            )
            .setFooter({ text: `Galactic Bot ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let memeembed = new MessageEmbed()
        memeembed
            .setTitle("Meme")
            .setDescription("Gets a random meme.")
            .addFields(
                { name: "Usage", value: "g!meme"},
            )
            .setFooter({ text: `Galactic Bot ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})

        let pikachu = new MessageEmbed()
        pikachu
            .setTitle("Pikachu")
            .setDescription("Gets a random pikachu image.")
            .addFields(
                { name: "Usage", value: "g!pikachu"},
            )
            .setFooter({ text: `Galactic Bot ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        
        switch(cmdname){
            case ("kick"):
               message.reply({ embeds: [kickembed] })
            break;
            case ("ban"):
                message.reply({ embeds: [banembed] })
            break;
            case ("mute"):
                message.reply({ embeds: [muteembed] })
            break;
            case ("ping" || "pong"):
                message.reply({ embeds: [pingembed] })
            break;
            case ("prefix" || "pref"):
                message.reply({ embeds: [prefixembed] })
            break;
            case ("namemc" || "nmc"):
                message.reply({ embeds: [nmcembed]})
            break;
            case ("skycrypt" || "sb" || "stats"):
                message.reply({ embeds: [statsembed] })
            break;
            case ("bald" || "confirmbald"):
                message.reply({ embeds: [baldembed]} )
            break;
            case ("suggest" || "suggestion"):
                message.reply({ embeds: [suggestembed] })
            break;
            case ("bw" || "bedwars"): 
                message.reply({ embeds: [bwembed] })    
            break;
            case ("sw" || "skywars"):
                message.reply({ embeds: [swembed] })
            break;
            case ("weight"):
                message.reply({ embeds: [weightembed] })
            break;
            case ("skills" || "skill" || "sa" || "skillavg"):
                message.reply({ embeds: [skillsembed] })
            break;
            case ("cat"):
                message.reply({ embeds: [catembed] })
            break;
            case ("dog"):
                message.reply({ embeds: [dogembed] })
            break;
            case ("fox"):
                message.reply({ embeds: [foxembed] })
            break;
            case ("meme"):
                message.reply({ embeds: [memeembed] })
            break;
            case ("pikachu"):
                message.reply({ embeds: [pikachu] })
            break;
            default:
                message.reply({ embeds: [defaultembed]})
        }
    }
}
