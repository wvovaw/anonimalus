const { prefix, resources } = require('../config.json');
const { MessageEmbed } = require('discord.js');

class eventHandler {
  constructor(client) {
    this.client = client;
  }

  async onReady() {
    // this.client.user.setActivity(`${prefix}help`, { type: 'LISTENING' });
    try {
      await this.client.user.setPresence({
        activity: {
          name: `${prefix}help for info`,
          type: 'LISTENING'
        }
      });
    }
    catch (e) {
      console.log('[BOT] Failed to set RPC');
      return;
    }
    console.log(`Logged in ad ${this.client.user.tag}`);
    return;
  }

  async onMessage(message) {
    // Ignore message if prefix is not providen
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Logging to conosole and starting the job
    console.log(`[msg]: ${message.content}`);

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const user = this.client.users.cache.get(message.author.id);



    // <prefix>help
    if (command === 'help') {
      const embed = new MessageEmbed()
        .setTitle('Anonimalus')
        .setColor(resources.embedColor)
        .setThumbnail(resources.thumbnailImage)
        .setDescription('Anonimalus 2ch. Send messages to the servername#channelname and nobody will now that it\'s from you')
        .addFields(
          { name: `${prefix}help`, value: 'Shows the help info' },
          { name: `${prefix}send <channelId> <message>`, value: 'Send a message as incognito\nTo get channelID: right click on text channel where you want message to be sent, then click \'coppy id\'\n' },
          { name: `${prefix}dm <userId> <message>`, value: 'Send a DM as incognito\nTo get userId: right click on user who you want text, then click \'coppy id\'\n' },
          { name: `${prefix}stats`, value: 'Show statistics about anonimalus usage' },
          { name: 'Invite url', value: `[click](${resources.inviteUrl})` },
          { name: 'Source code', value: `[here](${resources.repo})` }
        )
        .setFooter('anonimalus', resources.footerIcon);

      user.send(embed);
    }



    // <prefix>send <channelId> <message>
    // Send message to the channel of the certain guild   
    if (command === 'send') {
      if (message.channel.type !== 'dm') {
        user.send('Use this channel to send an anonymous message');
        return;
      }
      const channelId = args.shift();
      const messageText = args.join(' ');
      if (messageText == '') {
        user.send('Error: Empty input!');
        return;
      }

      // channelId should be a number
      if (!isFinite(String(channelId))) {
        user.send(`ERROR: Wrong channel id. Syntax: '${prefix}send <channelId> <message>'`);
        return;
      }
      else {
        try {
          const messageEmbed = new MessageEmbed()
            .setColor(resources.embedColor)
            .setTitle('Anonymous message')
            .setDescription(messageText)
            .setFooter('Anonimalus', resources.footerIcon);

          const channel = this.client.channels.cache.get(channelId);
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
          user.send('Error was occured!');
        }
      }
    }



    // <prefix>dm <userId> <message>
    // Send anonymous message to user directly
    if (command === 'dm') {
      if (message.channel.type !== 'dm') {
        user.send('Use this channel to send an anonymous message');
        return;
      }
      // Send command syntax: !dm <userId> <Message>
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

          const channel = this.client.users.cache.get(userId);
          channel.send(messageEmbed);

          const replyEmbed = new MessageEmbed()
            .setColor(resources.embedColor)
            .setTitle('Success')
            .setDescription('Message was sent to')
            .addFields(
              { name: `${channel.name}`, value: '_' }
            );
          user.send(replyEmbed);
        }
        catch (e) {
          console.error(e.message);
          user.send('Error was occured!');
        }
      }
    }
    return;
  }

  // Log when guild invite/kick the bot 
  onGuildInvite(guild) {
    console.log(`[BOT] Connected to ${guild}`);
  }
  onGuildDelete(guild) {
    console.log(`[BOT] Disconnected from ${guild}`);
  }
}

module.exports = eventHandler;