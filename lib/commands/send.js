const { resources } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @param {Discord.user} user
 * @param {Discord.client} client
 * @param {Array<string>} args
 */
function send(user, client, args) {
  const channelId = args.shift();
  const messageText = args.join(' ');
  if (messageText == '') {
    user.send('Error: Empty input!');
    return;
  }
  else {
    try {
      const messageEmbed = new MessageEmbed() .setColor(resources.embedColor)
        .setTitle('Anonymous message')
        .setDescription(messageText)
        .setFooter('Anonimalus', resources.footerIcon);

      const channel = client.channels.cache.get(channelId);
      const guildId = channel.guild.id;
      const channelUrl = `https://discordapp.com/channels/${guildId}/${channelId}`;

      const perms = channel.permissionsFor(channel.guild.me);
      const canSendToChannel = perms.toArray().includes('SEND_MESSAGES');

      if (canSendToChannel) channel.send(messageEmbed);
      else { user.send('Sorry, I don\'t have permission to write channel `#' + channel.name + '`.'); return; }

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

module.exports = send;
