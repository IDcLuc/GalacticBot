const Canvas = require('canvas');
const Discord = require('discord.js');

const dim = {
    height: 579,
    width: 1920
}
const av = {
    size: 381,
    x: 100,
    y: 99
}
const color = Math.random() < 0.5 ? "#059033" : "#4c3228"
const backgroundImage = "https://i.imgur.com/8iAnjlv.png"

const RankCard = async (member, lvl, msgcount, msgneeded) => {
    let percentage = Math.floor(msgcount / msgneeded * 100)
    let username = member.user.username
    let discrim = member.user.discriminator
    
    //create canvas context
    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext('2d')

    //draw background
    const backimg = await Canvas.loadImage(backgroundImage)
    ctx.drawImage(backimg, 0, 0)

    //draw pfp
    ctx.save()
    async function drawUserAvatar(ctx, avatar, avatar) {
            const arcX = avatar.x + (avatar.w / 2)
            const arcY = avatar.y + (avatar.h / 2)
        
            ctx.beginPath()
            ctx.arc(arcX, arcY, (avatar.w + 3) / 2, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.fillStyle = '#242424'
            ctx.fill()
            ctx.beginPath()
            ctx.arc(arcX, arcY, avatar.w / 2, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.clip()
        
            const avImg = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png" }))
        
            ctx.drawImage(avImg, avatar.x, avatar.y, avatar.w, avatar.h)
        }
    await drawUserAvatar(ctx, member, { w: av.size, h: av.size, x: av.x, y: av.y })
    ctx.restore()

    //type progress
    ctx.fillStyle = "white"
    ctx.textAlign = "right"
    ctx.font = "93px FORQUE"
    ctx.fillText(`${msgcount} / ${msgneeded}`, 1750, 320)

    //type level
    ctx.fillStyle = "white"
    ctx.textAlign = "left"
    ctx.font = "100px FORQUE"
    ctx.fillText(`${lvl}`, 1767, 173)

    //draw progress bar
    for(let i = 0; i < percentage; i++)  {
        ctx.beginPath()
        ctx.lineWidth = 81
        ctx.fillStyle = color
        ctx.arc(608 + (i * 11.35), 406, 41, 0, Math.PI * 2, true)
        ctx.fill()
    }

    //type username and discriminator
    ctx.fillStyle = "white"
    ctx.textAlign = "left"
    ctx.font = "88px FORQUE"
    ctx.fillText(`${username}#${discrim}`, 606, 333)

    //export image
    return new Discord.MessageAttachment(canvas.toBuffer(), `${username}#${discrim}.png`)
}

module.exports = RankCard