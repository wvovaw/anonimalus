const { prefix, resources } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @param {Discord.user} user
 */
function help(user, clientId) {
  const embed = new MessageEmbed()
    .setTitle('Anonimalus')
    .setColor(resources.embedColor)
    .setThumbnail(resources.thumbnailImage)
    .setDescription(`Anonimalus 2ch.\nSend anonymous messages to the server's text channel or to the user directly.\nThe bot and user you want to message must have at least one common server.\n So, invite this bot to your servers if you want to use it in your community.\n(You may also send messages from the [website](${resources.website + '/send'}), if you don't trust discord chat way.`)
    .addFields(
      { name: `${prefix}help`, value: 'Shows the help info' },
      { name: `${prefix}howto`, value: 'How to get user ID and channel ID' },
      { name: `${prefix}send <channelId> <message>`, value: 'Send a server message as incognito\nTo get channelID: right click on text channel where you want message to be sent, then click \'coppy id\'\nExample: !send 123456789012 Hello there!' },
      { name: `${prefix}dm <userId> <message>`, value: 'Send a direct message as incognito\nTo get userId: right click on the user who you want to text, then click \'coppy id\'\nExample: !dm 10987654321 Money, Lebowski...' },
      { name: 'Invite url', value: `[click](https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=256064)`},
      { name: 'Website', value: `[here](${resources.website})` },
      { name: 'Source code', value: `[here](${resources.repo})` }
    )
    .setFooter('anonimalus', resources.footerIcon);

  user.send(embed);
}

module.exports = help;
