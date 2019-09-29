const Discord = require("discord.js");
const forEachTimeout = require("foreach-timeout");
const bot = new Discord.Client();
const colors = ["FF0000","FFFC00","00FF3E","00FDFF","0003FF","FF00F1"];
const stop = [];
async function color () {
    forEachTimeout(colors, (color) => {
        bot.guilds.forEach((guild) => {
                if (!stop.includes(guild.id)) {
                let role = guild.roles.find("name", "r");
                if (role && role.editable) 
                    role.setColor(color);
            }  
        })
    }, 4100).then(color);
}
bot.on("ready", () => {
    console.log("")
    console.log("----------------------------")
    console.log()
    console.log(`${bot.user.username} Is Online!!!`)
    console.log()
    console.log("----------------------------") 
    console.log()
    console.log("Information about the Bot:")
    console.log()
    console.log(`TotalGuilds: ${bot.guilds.size}`)
    console.log()
    console.log(`TotalUsers: ${bot.users.size}`)
    console.log()
    console.log("----------------------------")
	
	    function changing_status() {
        let status = [`Servers: ${bot.guilds.size} | Users: ${bot.users.size}`,`bot by RicoBD#1874`]
        let randomStatus = status[Math.floor(Math.random() * status.length)]
        bot.user.setActivity(randomStatus, {type: "PLAYING"});
        bot.user.setStatus("idle")
    }
    setInterval(changing_status, 12000)
})
color();
bot.on("message", (message) => {
    if (message.channel.type !== "text") return;
    if (message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission("ADMINISTRATOR") || message.member.id === message.guild.owner.id) {
        if (message.content === ",,stop") {stop.push(message.guild.id); return message.channel.send("The Rainbow Has Stopped :( ");}
        if (message.content === ",,start") {stop.splice(stop.indexOf(message.guild.id),1); return message.channel.send("The Rainbow Has Started :)");}
    }
})
bot.login(process.env.token);
