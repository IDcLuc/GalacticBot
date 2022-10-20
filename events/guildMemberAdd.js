module.export = {
    name: "guildMemberAdd"
    run: async (member) => {
        const img = await imageGenerator(member)
        const welcomeChannelId = '986310622876676136'
        member.guild.channels.cache.get(welcomeChannelId).send({
            content: `Hey, <@${member.id}>! Welcome to the server, please make sure to read the rules before chatting!`,
            files: [img]
        })
    }
}
