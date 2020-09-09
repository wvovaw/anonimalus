const { prefix, resources } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

/**
 *
 * @param {Discord.user} user
 * @param {Discord.client} client
 * @param {Array<string>} args
 */
function dm(user, client, args) {
  const userId = args.shift();
  const messageText = args.join(' ');
  if (messageText == '') {
    user.send('Error: Empty input!');
    return;
  }

  if (!isFinite(String(userId))) {
    user.send(`ERROR: Wrong user id. Syntax: '${prefix}dm <userId> <message>'`);
    return;
  }
  else {
    try {
      const messageEmbed = new MessageEmbed()
        .setColor(resources.embedColor)
        .setTitle('You\'ve got an anonymous message')
        .setDescription(messageText)
        .setFooter('Anonimalus', resources.footerIcon);

      const channel = client.users.cache.get(userId);
      channel.send(messageEmbed);

      const replyEmbed = new MessageEmbed()
        .setColor(resources.embedColor)
        .setTitle('Success')
        .setDescription('Message was sent to')
        .addFields(
          { name: `${channel.tag}`, value: '✓' }
        );
      user.send(replyEmbed);
    }
    catch (e) {
      console.error(e.message);
      user.send('Error was occured!\nProbably, recipient doesn\'t have a common server with Anonimalus.');
    }
  }

}

module.exports = dm;
