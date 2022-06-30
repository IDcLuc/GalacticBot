const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "dog",
    category: "fun",
    cooldown: 5,
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        function getMeme() {
            return fetch(`https://some-random-api.ml/img/dog`)
            .then(data => data.json())
            .then(obj => obj.link);
        }

        const dog = await getMeme();

        const memeembed = new MessageEmbed()
        memeembed
            .setTitle(`Woof! :dog:`)
            .setImage(`${dog}`)
            .setColor("RANDOM")
            .setFooter({ text: `Galactic Bot by IDcLuc ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        message.reply({ embeds: [memeembed] })
    }
}