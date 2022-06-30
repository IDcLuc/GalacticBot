const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pikachu",
    category: "fun",
    cooldown: 5,
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        function getMeme() {
            return fetch(`https://some-random-api.ml/img/pikachu`)
            .then(data => data.json())
            .then(object => object.link);
        }

        const pikachu = await getMeme();

        const memeembed = new MessageEmbed()
        memeembed
            .setTitle(`Pika! <a:PixelPikachu:984540555650408558>`)
            .setImage(`${pikachu}`)
            .setColor("RANDOM")
            .setFooter({ text: `Galactic Bot by IDcLuc ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        message.reply({ embeds: [memeembed] })
    }
}