const { resources } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @param {Discord.user} user
 */
async function howto(user) {
  const userIdGifembed = new MessageEmbed()
    .setTitle('How to get a user ID')
    .setColor(resources.embedColor)
    .setImage(resources.userIdGif)
    .setFooter('anonimalus', resources.footerIcon);

  const channelIdGifembed = new MessageEmbed()
    .setTitle('How to get a channel ID')
    .setColor(resources.embedColor)
    .setImage(resources.userIdGif)
    .setFooter('anonimalus', resources.footerIcon);

  await user.send(userIdGifembed);
  await user.send(channelIdGifembed);
  return;
}

module.exports = howto;
