const { resources } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @param {Discord.user} user
 * @param {Discord.client} client
 * @param {Array<string>} args
 */
function dm(user, client, args) {
  const channelId = args.shift();
  const messageText = args.join(' ');
  if (messageText == '') {
    user.send('Error: Empty input!');
    return;
  }

  else {
    try {
      const messageEmbed = new MessageEmbed()
        .setColor(resources.embedColor)
        .setTitle('Anonymous message')
        .setDescription(messageText)
        .setFooter('Anonimalus', resources.footerIcon);

      const channel = client.channels.cache.get(channelId);
      const guildId = channel.guild.id;
      const channelUrl = `https://discordapp.com/channels/${guildId}/${channelId}`;

      channel.send(messageEmbed);

      const replyEmbed = new MessageEmbed()
        .setColor(resources.embedColor)
        .setTitle('Success')
        .setDescription('Message was sent to')
        .addFields(
          { name: `${channel.guild}#${channel.name}`, value: `[go](${channelUrl})` }
        );
      user.send(replyEmbed);
    }
    catch (e) {
      console.error(e.message);
      user.send('Error was occured!\nProbably, Anonimalus is not in the server. Try to invite it.');
    }
  }
}

module.exports = dm;
