const ms = require('ms');

module.exports = {
    name: "uptime",
    aliases: ["up"],
    category: "misc",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let time = client.uptime;
        let uptime = ms(time).toString();
        
        function formatUptime(upTime) {
            number = upTime.match(/\d+/);
            if (upTime.endsWith('s')) {
            if (number == 1)
                return number + ' second';
            else
                return number + ' seconds';
            }
            else if (upTime.endsWith('m')) {
            if (number == 1)
                return number + ' minute';
            else
                return number + ' minutes';
            }
            else if (upTime.endsWith('h')) {
            if (number == 1)
                return number + ' hour';
            else
                return number + ' hours';
            }
            else if (upTime.endsWith('d')) {
            if (number == 1)
                return number + ' day';
            else
                return number + ' days';
            }
            else if (upTime.endsWith('w')) {
            if (number == 1)
                return number + ' week';
            else
                return number + ' weeks';
            }
            else if (upTime.endsWith('m')) {
            if (number == 1)
                return number + ' month';
            else
                return number + ' months';
            }
            else if (upTime.endsWith('y')) {
            if (number == 1)
                return number + ' year';
            else
                return number + ' years';
            }
        }

        message.reply(`The bot has been online for ${formatUptime(uptime)}.`)
    }
}