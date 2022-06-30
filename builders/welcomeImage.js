const Canvas = require('canvas');
const Discord = require('discord.js');

const background = "https://cdn.discordapp.com/attachments/632590539379834887/977205911250677780/unknown.png"

const dim = {
    height: 1080,
    width: 1920,
    margin: 50
};

const av = {
    size: 256,
    x: 824,
    y: 438
};

const WelcomeImg = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext('2d')

    //draw in background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    //draw black box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(250, 250, dim.width - 10 * dim.margin, dim.height - 10 * dim.margin)

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
    //draw text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    //draw username and tag
    ctx.font = "60px Sans"
    ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin - 650)

    return new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
};
module.exports = WelcomeImg