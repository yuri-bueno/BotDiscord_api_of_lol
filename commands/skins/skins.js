const Discord = require('discord.js')
const axios = require("axios")








module.exports = {
    name: 'skins',
    aliases: ['skin'],
    run: async (client ,interaction) => {

     
       let campeao = interaction.content
        campeao = campeao.split(' ')

        if (!campeao[1]) return


        campeao =campeao[1]+(campeao[2]?campeao[2][0].toUpperCase()+campeao[2].slice(1):'');
        campeao = campeao[0].toUpperCase() + campeao.slice(1)
        console.log(campeao);
        
        let arrays={id:[],name:[]}

        function dontFound() {
            let embed2 = new Discord.EmbedBuilder()
                .setColor(0xFF0000)
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setDescription(`campeão não encontrado`)
                interaction.reply({ embeds: [embed2] })
        }



        axios.get(`https://ddragon.leagueoflegends.com/cdn/12.19.1/data/pt_BR/champion/${campeao}.json`)
        .then(resp => {
            skins= resp.data.data[campeao].skins
            skins.map((skin)=>{
                arrays.id.push(skin.num)                
                arrays.name.push(skin.name) 
             //   console.log(arrays);     ver as skins         
             
           })
           
           enviar(arrays)
        }
       ).catch(e=>{
        dontFound()
       })
      async function enviar(arrays) {

        

       

        let embed = new Discord.EmbedBuilder()       
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${campeao}.png`)
            .setTitle(`Skin: ${campeao} (default)`)
            .setImage(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${campeao}_0.jpg`)
       

        
        const actionRow = new Discord.ActionRowBuilder()
        .addComponents(
            [
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setLabel('<<<')
                    .setCustomId('VOLTAR'),
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setLabel('>>>')
                    .setCustomId('PROXIMO'),
                    new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setLabel('X')
                    .setCustomId('APAGAR')
            ]
        )
        

       const msg= await interaction.reply({ embeds: [embed], components: [actionRow] })



      /*  const filter = m => {

           return m.user.id ===interaction.author.id
           
        }*/
            const coletor =msg.createMessageComponentCollector({ time: (10 * 60000) })



            let skins =arrays
            let skinDaVez=0
            let setNome =campeao
            let setSkin =0


            coletor.on("collect",(c)=>{

                switch (c.customId) {
                    case 'VOLTAR':

                        skinDaVez--     
                        if(skinDaVez==-1){skinDaVez=skins.id.length-1}
                                      
                        setNome=skins.name[skinDaVez]
                        setSkin=skins.id[skinDaVez]

                        break;
                    case 'PROXIMO':

                        skinDaVez++
                      if(skinDaVez==skins.id.length){skinDaVez=0}
                                                   
                        setNome=skins.name[skinDaVez]
                        setSkin=skins.id[skinDaVez]

                        break;
                    case 'APAGAR':
                        c.deleteReply()
                        
                        break;
                }   

                let embedPerson = {

                    title: `Skin: ${setSkin==0?`${campeao} (${setNome})`:`${setNome}`} `,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL(),
                        url: '',
                    },                   
                    thumbnail: {
                        url: `http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${campeao}.png`,
                    },
                    image: {
                        url: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${campeao}_${setSkin}.jpg`,
                    },
    
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: 'yurizinho produções',
                        icon_url: client.user.displayAvatarURL(),
                    },
                };

              //  embed.edit({ embeds: [embedPerson] })
                c.update({embeds: [embedPerson], components: [actionRow]})
            })
        
            coletor.on('end', (collected, reason) => {
                if (reason === 'time tirar isso daqui dps') interaction.editReply({
                    content: 'tempo',
                    components: []
                })
            })
    }}
}