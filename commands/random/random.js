const Discord = require('discord.js')
const axios = require("axios")

const db = require('./db.json')

module.exports = {
    name: 'random',
    aliases: ['random'],
    run: async (client, message, args) => {
    
       champRandom= Math.floor(Math.random() * (db.length))
       let name =db[champRandom].name
       
       
        let sortSkin=Math.floor(Math.random() * (db[champRandom].skins.length));
        let skinName =db[champRandom].skins[sortSkin].name
        let skin =db[champRandom].skins[sortSkin].num
        console.log(db[champRandom].name);
        console.log(sortSkin)

            let embed = {

                title: `${name}:`,
                author: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL(),
                    url: '',
                },
                description: skinName,
                thumbnail: {
                    url: `http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${name}.png`,
                },
                image: {
                    url: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skin}.jpg`,
                },

                timestamp: new Date().toISOString(),
                footer: {
                    text: 'yurizinho produções',
                    icon_url: client.user.displayAvatarURL(),
                },
            };



            message.reply({ embeds: [embed] })
        

        function dontFound() {
            let embed2 = new Discord.EmbedBuilder()
                .setColor(0xFF0000)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setDescription(`campeão não encontrado`)
            message.reply({ embeds: [embed2] })
        }
    }
}