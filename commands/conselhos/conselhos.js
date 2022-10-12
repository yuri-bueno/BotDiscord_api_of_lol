const axios = require("axios")
const Discord = require('discord.js')

module.exports = {
    name: 'conselhos',
    aliases: ['conselho'],
    run: async (client, message, args) => {

        let texto

        axios.get("https://api.adviceslip.com/advice").then(resp => {
            texto = resp.data.slip.advice
            axios.get(`https://api.mymemory.translated.net/get?q=${texto}&langpair=en|pt-BR`).then(resp => {
                texto = resp.data.responseData.translatedText
                message.reply({ content: texto })
            }).catch(e=>{
                message.reply({ content: 'Sem conselhos por hoje :(' })
            })
        }).catch(e=>{
            message.reply({ content: 'Sem conselhos por hoje :(' })
        })

        // message.reply({ content: "dsada" })
    }
}