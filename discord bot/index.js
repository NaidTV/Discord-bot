require('events').EventEmitter.prototype._maxListeners = 100; 
const Discord = require('discord.js');
const bot = new Discord.Client();


bot.login("ODA1MTY0NDY1OTA4ODc1MzA1.YBW51w.w7ZytyM2kkrSZYrZTblDh8gR1FU");

bot.on("ready", (message) => {
    var utente = bot.users.cache.get("672066155380211712");
    utente.send("Naid's bot avviato! Al vostro servizio!")
    bot.user.setActivity("[k!help]", { type: "LISTENING"})
    console.log("------------ONLINE------------")
})
bot.on('message', message => {
    if (message.content === `k!dado`) {
      var rating = Math.floor(Math.random() * 6) + 1;
      var dado = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("**:game_die: E' USCITO IL NUMERO **" + rating + " :game_die:" )
      message.channel.send(dado);
   }
  });
  bot.on('message', message => {
    const args = message.content.split(" ").slice(1);
    if(message.content.startsWith('k!say')) {
        message.delete({timeout: 1000})
        var saytext = args.join(" ");
        message.channel.send(saytext)
    };
  } )

bot.on('message', (message) => {
    if (message.content == 'k!time') {
        var data = new Date();
        var ora = data.getHours();
        var minuto = data.getMinutes();
        if(ora < 10){
            ora = "0" + ora;
          }
          if(minuto < 10){
            minuto = "0" + minuto ;
          }

        message.channel.send("ORA ATTUALE :alarm_clock:: " + ora + ":" + minuto)

    }
    //k!clear 50
    if (message.content.startsWith("k!clear")) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non hai il permesso');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non ho il permesso');
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {
            message.channel.send("Inserisci un numero valido")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            msg.delete({ timeout: 1000 })
        })
    }
    if (message.content.startsWith("k!kick")) {
       
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("Non hai il permessso");
            return;
        }
        if (!utenteKick) {
            message.channel.send("Non hai menzionato nessun utente");
            return;
        }
        
        if (!utenteKick.kickable) {
            message.channel.send("Il bot non ha il permesso");
            return;
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + "> è stato kiccato"))
    }
        if (message.content.startsWith("k!ban")) {
            var utenteKick = message.mentions.members.first();
            var utenteKick2 = message.mentions.users.first();
        
            if (!message.member.hasPermission('BAN_MEMBERS')) {
                message.channel.send('Non hai il permesso!')
                 .then(msg => {
                   msg.react(":x:")
                })
                return;
            }
        
            if (!utenteKick) {
                message.channel.send('Non hai menzionato nessun utente!')
                .then(msg => {
                    msg.react(":x:")
                 })
                return;
            }
        
            if (!message.mentions.members.first().kickable) {
                message.channel.send('Non ho il permesso!')
                .then(msg => {
                    msg.react(":x:")
                 })
                return
            }
            var argomenti = message.content.split(" ");
        
            var reason = "";
            if (argomenti.length == 2) { //Se non viene inserito un motivo
                reason = "Nessun motivo";
            }
            else {
                for (var i = 2; i < argomenti.length; i++) {
                    reason += argomenti[i] + " "
                }
            }
        
            var logban1 = new Discord.MessageEmbed()
            .setColor("#ff3c3c")
            .setAuthor("[BAN] " + utenteKick2.tag, utenteKick2.avatarURL())
            .addField("Utente", utenteKick.toString(), true)
            .addField("Moderazione", message.author.toString(), true)
            .addField("Motivo", reason, true)
        
            utenteKick.send("Sei stato bannato dal Server dei KingSlayers da " + message.author.toString() + " con motivazione: " + reason)

      .then(setTimeout(function(){
        utenteKick.ban()}, 3000) )
      .then(() =>
        message.channel.send(logban1))
        
            var log = bot.channels.cache.get("802912978767708190");
            var logban = new Discord.MessageEmbed()
            .setColor("#ff3c3c")
            .setAuthor("[BAN] " + utenteKick2.tag, utenteKick2.avatarURL())
            .addField("Utente", utenteKick.toString(), true)
            .addField("Moderazione", message.author.toString(), true)
            .addField("Motivo", reason, true)
            log.send(logban)
        
          bot.on("guildMemberAdd", (member) => {
            bot.channels.cache.get("802894411477811240").send("👋Ciao " + member.toString() + "\nBenvenuto in **" + member.guild.name + "**\nSei il **" + member.guild.memberCount + "° membro**\n Leggi le <#802900398074494997>\n **Fai la <#802865229045694474>");
        })
	}
    if (message.content === "k!serverstats") {
        var server = message.member.guild;
        var botCount = server.members.cache.filter(member => member.user.bot).size
        var memberCount = server.memberCount - botCount;

        var categoryCount = server.channels.cache.filter(c => c.type == "category").size;
        var textCount = server.channels.cache.filter(c => c.type == "text").size;
        var vocalCount = server.channels.cache.filter(c => c.type == "voice").size;

        var serverStats = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le statistiche su questo server")
            .setThumbnail(server.iconURL())
            .addField(":technologist: Owner", "```" + server.owner.user.username + "```", true)
            .addField(":placard: Server ID", "```" + server.id + "```", true)
            .addField(":map: Server region", "```" + server.region + "```", true)
            .addField(":busts_in_silhouette: Members", "```Total: " + server.memberCount + " | Members: " + memberCount + " | Bots: " + botCount + "```", false)
            .addField(":loud_sound: Server categories and channels", "```Category: " + categoryCount + " | Text: " + textCount + " | Voice: " + vocalCount + "```", false)
            .addField(":calendar_spiral: Server created", "```" + server.createdAt.toDateString() + "```", true)
            .addField(":beginner: Boost level", "```Level " + server.premiumTier + " (" + server.premiumSubscriptionCount + " boost)```", true)
        message.channel.send(serverStats)
	}
        if (message.content.startsWith("k!userinfo")) {
            if (message.content == "k!userinfo") {
                var utente = message.member;
            }
            else {
                var utente = message.mentions.members.first();
            }
    
            if (!utente) {
                message.channel.send("Non ho trovato questo utente")
                return
            }
    
            var elencoPermessi = "";
            if (utente.hasPermission("ADMINISTRATOR")) {
                elencoPermessi = "👑 ADMINISTRATOR";
            }
            else {
                var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]
    
                for (var i = 0; i < permessi.length; i++) {
                    if (utente.hasPermission(permessi[i])) {
                        elencoPermessi += "- " + permessi[i] + "\r";
                    }
                }
            }
    
            var embed = new Discord.MessageEmbed()
                .setTitle(utente.user.tag)
                .setDescription("Tutte le info di questo utente")
                .setThumbnail(utente.user.avatarURL())
                .addField("User id", "```" + utente.user.id + "```", true)
                .addField("Status", "```" + utente.user.presence.status + "```", true)
                .addField("Is a bot?", utente.user.bot ? "```Yes```" : "```No```", true)
                .addField("Account created", "```" + utente.user.createdAt.toDateString() + "```", true)
                .addField("Joined this server", "```" + utente.joinedAt.toDateString() + "```", true)
                .addField("Permissions", "```" + elencoPermessi + "```", false)
                .addField("Roles", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)
    
            message.channel.send(embed)
    
        }
        if (message.content == "k!help") {
            var infoinviate = new Discord.MessageEmbed()
            .setColor("#1be350")
            .setTitle(":pushpin: INFO INVIATE IN PRIVATO :pushpin:")
            var helpbot = new Discord.MessageEmbed()
            .setColor("#fc0324")
            .setTitle("HELP COMMAND")
            .setDescription(":sos: Ecco a te i comandi :sos:")
            .addField("k!userinfo", "Per vedere le info di un utente, Coming soon")
            .addField("k!serverstats", "Per avere le info sul server, Coming soon")
            .addField("k!rank", "Per vedere i livelli, Coming soon")
            .addField("k!search <nome canzone>", "Per cercare una canzone, Coming soon")
            .addField("k!play", "Per ascolare la canzone, Coming soon")
            .addField("k!skip", "Per skippare una canzone, Coming soon")
            .addField("k!twitch", "Per vedere il nostro canale twitch")
            .addField("k!yt", "Per vedere il canale youtube")
            .addField("k!ciao", "Per far chiedere come stai al bot")
            message.delete()
            message.author.send(helpbot)
            message.channel.send(infoinviate)
            .then(msg => {
                msg.delete({timeout: 3000})
            })
                if (message.content == "k!audio") {
                    const voiceChannel = message.member.voice.channel;
                    if (voiceChannel) {
                        voiceChannel.join()
                            .then(connection => {
                                connection.play('audio.mp3'); //Scrivere il nome del file audio nella cartella o il path
                            });
                    }
                    else {
                        message.channel.send("No voice channel."); //Messaggio se l'utente non è in nessun canale vocale
                    }
                    if (message.content == "k!youtube") {
                            var youtube = new Discord.MessageEmbed()
                                .setTitle("KingSlayers")
                                .setColor("#41A9F6")
                                .setURL("https://www.youtube.com/channel/UCRddChd0-yB0dCIw9-oIrmQ")
                                .setDescription(":love_you_gesture: Questo è il canale youtube KingSlayers\rIscriviti, lascia like, e attiva la campanellina")
                                .setThumbnail("https://lh3.googleusercontent.com/a-/AOh14Gj2PbLSVkxd815TwZMCe-2sBucZp9-4oQmuiJe1=s600-k-no-rp-mo")
                            message.channel.send(youtube);
                    }
                    if (message.content == "k!twitch") {
                            var twitch = new Discord.MessageEmbed()
                                .setTitle("KingSlayers")
                                .setColor("#41A9F6")
                                .setURL("https://www.twitch.tv/kingslayerstv_")
                                .setDescription(":love_you_gesture: Questo è il canale twitch KingSlayers\rmi raccomando iscriviti")
                                .setThumbnail("https://lh3.googleusercontent.com/a-/AOh14Gj2PbLSVkxd815TwZMCe-2sBucZp9-4oQmuiJe1=s600-k-no-rp-mo")
                            message.channel.send(twitch);
                    }
                if (message.content == "k!ciao") {
                    message.channel.send("Come stai?").then(messaggio => {
                        messaggio.react('👍');
                        messaggio.react('👎');
                
                        const filtro = (reaction, user) => ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id; //Tra le parentesi quadre inserire tutte le emoji delle reazioni
                
                        messaggio.awaitReactions(filtro, { max: 1, time: 30000 }).then(collected => { //Max = numero massimo di volte che l'utente puo cliccare sulla reazione, Time = tempo limite per cliccare
                
                            var reazione = collected.first().emoji.name;
                            if (reazione == "👍") {
                                message.channel.send("OK!"); //Azione che si esegue quando si clicca 👍
                            }
                            if (reazione == "👎") {
                                message.channel.send("Perché?"); //Azione che si esegue quando si clicca 👎
                            }
                            message.delete(); //Cancellare il comando dell'utente
                            
                        }).catch(collected => {
                            return message.channel.send("Tempo scaduto"); //Messaggio se il tempo è scaduto (se non è stato inserito un tempo, questa parte non è necessario)
                        });
                    })
                }

        
        if (message.content == "k!staff") {
            const nomeEmbed = new Discord.MessageEmbed()
                .setColor("#34a454") // Colore principale
                .setTitle("Staff di King Slayers") .setThumbnail("https://lh3.googleusercontent.com/a-/AOh14Gj2PbLSVkxd815TwZMCe-2sBucZp9-4oQmuiJe1=s600-k-no-rp-mo")
                .setDescription("**OWNER**\n -ItzEnn\n -calitoto\n -Naid_TV\n **ADMIN**\n-ItzFra\n **CAPO MOD**\n //\n **MOD**\n //")
                //Aggiungere elementi 
        
            message.channel.send(nomeEmbed)
        }
    }}
})

bot.on("guildMemberAdd", member => {
    var canale = bot.channels.cache.get("807628534457171978")
    canale.setName("🎫│members: " + member.guild.memberCount)
});
bot.on("guildMemberRemove", member => {
    var canale = bot.channels.cache.get("807628534457171978")
    canale.setName("🎫│members: " + member.guild.memberCount)
});
