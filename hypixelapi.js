const HypixelAPIReborn = require('hypixel-api-reborn');
const hypixel = new HypixelAPIReborn.Client(process.env.apikey, {cache: true});
module.exports = hypixel;
