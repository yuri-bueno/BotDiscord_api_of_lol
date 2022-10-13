const axios = require("axios")
const Discord = require('discord.js')
require("dotenv").config()
module.exports = {
    name: 'nick',
    aliases: ['nicks'],
    run: async (client, message, args) => {





        let nick = message.content
        nick = nick.split('&nick ')
        console.log('pesquisou o nick:', nick);
        if (!nick[1]) return

        const accountId = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick[1]}`,
            { headers: { 'X-Riot-Token': process.env.LOL_KEY } }).then(resp => {
                return resp.data
            }).catch((e) => {
                console.error(e)
                message.reply({ content: "⚠⚠ error ⚠⚠" })
            })


        let { id, summonerLevel, profileIconId, name } = accountId

        const infoAccount = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
            { headers: { 'X-Riot-Token': process.env.LOL_KEY } }).then(resp => {
                return resp.data
            }).catch((e) => {
                console.error(e)
                message.reply({ content: "⚠⚠ error ⚠⚠" })
            })




        let { tier: tierSoloQ, rank: rankSoloQ, leaguePoints: leaguePointsSoloQ, wins: winsSoloQ, losses: lossesSoloQ } = infoAccount[0] ? infoAccount[0] : ''
        let winrateSoloQ = infoAccount[0] ? (winsSoloQ * 100 / (winsSoloQ + lossesSoloQ)).toFixed(1) : 0




        let { tier: tierFlex, rank: rankFlex, leaguePoints: leaguePointsFlex, wins: winsFlex, losses: lossesFlex } = infoAccount[1] ? infoAccount[1] : ''
        let winrateFlex = infoAccount[1] ? (winsFlex * 100 / (winsFlex + lossesFlex)).toFixed(1) : 0


        let embed = new Discord.EmbedBuilder()
            .setColor(winrateSoloQ > 50 ? 0x41a50f : 0xa51e0f)
            .setTitle(`Nick : ${name}`)
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setFooter({
                text: 'yurizinho produções',
                iconURL: client.user.displayAvatarURL(),
            })
            .addFields([
                {
                    name: `SoloQ:`,
                    value: infoAccount[0] ? `\`${tierSoloQ} ${rankSoloQ}\` \nWinRate: \`${winrateSoloQ}\`%` : "Sem elo",
                    inline: true
                },
                {
                    name: `Flex:`,
                    value: infoAccount[1] ? `\`${tierFlex} ${rankFlex}\` \nWinRate: \`${winrateFlex}\`%` : "Sem elo",
                    inline: true
                }
            ])
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${profileIconId}.png`)
            .setTimestamp(new Date())
            .setURL(`https://www.leagueofgraphs.com/summoner/br/${name.replace(/ /g, '+')}`)


        message.reply({ embeds: [embed] })





    }
}