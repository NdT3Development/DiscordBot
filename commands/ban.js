exports.run = async (client, message, args, level) => {
	if (message.channel.type === "dm") {
		  message.channel.send("This is not a command that can be used in a direct message.");
	} else {
		if(!message.member.roles.some(r=>["Owner", "test"].includes(r.name)) )
			return message.reply("Sorry, you don't have permissions to use this!");
    
		let member = message.mentions.members.first();
		if(!member)
			return message.reply("Please mention a valid member of this server");
		if(!member.bannable) 
			return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

		let reason = args.slice(1).join(' ');
		if(!reason)
			return message.reply("Please indicate a reason for the ban!");
    
		member.ban(message.author.username + " banned this user with reason: " + reason)
		.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
		message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Ban hammer time",
  usage: "ban [@\\user] [reason]"
};
