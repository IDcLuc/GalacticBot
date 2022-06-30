const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "fox",
    category: "fun",
    cooldown: 5,
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        function getMeme() {
            return fetch(`https://some-random-api.ml/img/fox`)
            .then(data => data.json())
            .then(object => object.link);
        }

        const fox = await getMeme();

        const memeembed = new MessageEmbed()
        memeembed
            .setTitle(`*Howls*! :fox:`)
            .setImage(`${fox}`)
            .setColor("RANDOM")
            .setFooter({ text: `Galactic Bot by IDcLuc ● Powered by some-random-api.ml ● Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL()})
        message.reply({ embeds: [memeembed] })
    }
}