const { resources } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @param {Discord.client} client
 * @param {Discord.channel.id} channelId
 * @param {String} message
 */
function messageToChannel(client, channelId, message) {
  try {
    const messageEmbed = new MessageEmbed()
      .setColor(resources.embedColor)
      .setTitle('Anonymous message')
      .setDescription(message)
      .setFooter('Anonimalus', resources.footerIcon);

    const channel = client.channels.cache.get(channelId);
    if (!channel) return 'Channel with the channelId not found.';
    const canSendToChannel = channel.permissionsFor(channel.guild.me).toArray().includes('SEND_MESSAGES');
    if (canSendToChannel) {
      return channel
        .send(messageEmbed)
        .then(() => 'Success!')
        .catch(() => 'Failure');
    }
    else return 'Something went wrong /shrug';
  }
  catch (e) {
    console.error(e.message);
    return 'Error was occured!\nProbably, Anonimalus is not in the server. Try to invite it.';
  }
}

module.exports = messageToChannel;
