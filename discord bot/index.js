const Discord = require('discord.js');
const client = new Discord.Client();

client.login("ODA1MTY0NDY1OTA4ODc1MzA1.YBW51w.iRKKbsQB7K2iP1lxX5XPTGgko_c");

client.on("message", (message) => {
    if (message.content == 'madonna') {
        message.channel.send("puttana")
    }
})
client.on("message", (message) => {
    if (message.content == '!provino' && message.author != "805164465908875305"){
            message.channel.send('Ciao sono Naid_TV s bot se vuoi fare il provino reagisci a questo messaggio')
        }
});
client.on("message", (message) => {
    if (message.content == '!clear' && message.author != "805164465908875305"){
            message.channel.send('Non ho voglia cancella tu i messaggi')
        }
});