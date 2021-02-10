const { resources } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @param {Discord.client} client
 * @param {Discord.user.id} userId
 * @param {String} message
 */
function messageToUser(client, userId, message) {
  if (message == '')
    return 'Error: Empty message!';

  else {
    try {
      const messageEmbed = new MessageEmbed()
        .setColor(resources.embedColor)
        .setTitle('You\'ve got an anonymous message')
        .setDescription(message)
        .setFooter('Anonimalus', resources.footerIcon);

      const channel = client.users.cache.get(userId);
      return channel.send(messageEmbed)
        .then(() => `Success! Message sent to ${channel.tag}`)
        .catch(() => 'Failure');
    }
    catch (e) {
      console.error(e.message);
      return 'Error was occured!\nProbably, recipient doesn\'t have a common server with Anonimalus.';
    }
  }
}

module.exports = messageToUser;
