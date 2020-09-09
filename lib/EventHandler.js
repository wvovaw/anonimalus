const { prefix } = require('../config.json');
const send = require('./commands/send');
const dm = require('./commands/dm');
const help = require('./commands/help');
const howto = require('./commands/howto');

class eventHandler {
  /**
   *
   * @param {Discord.client} client
   */
  constructor(client) {
    this.client = client;
  }

  async onReady() {
    try {
      await this.client.user.setPresence({
        activity: {
          name: `${prefix}help and for info`,
          type: 'LISTENING'
        }
      });
    }
    catch (e) {
      console.log('[BOT] Failed to set RPC');
      return;
    }
    console.log(`Logged in as ${this.client.user.tag}`);
    return;
  }

  /**
   *
   * @param {Discord.message} message
   */
  async onMessage(message) {
    // Ignore message if prefix is not providen
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // And if message was sent not from bot dm
    if (message.channel.type !== 'dm') {
      user.send('Use this channel to send an anonymous message');
      return;
    }
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const user = this.client.users.cache.get(message.author.id);

    switch (command) {
    case 'help':
      help(user);
      break;

    case 'send':
      send(user, this.client, args);
      break;

    case 'dm':
      dm(user, this.client, args);
      break;

    case 'howto':
      howto(user);
      break;
    }
    return;
  }

  /**
   *
   * @param {Discord.guild} guild
   */
  onGuildInvite(guild) {
    console.log(`[BOT] Connected to ${guild}`);
  }

  /**
   *
   * @param {Discord.guild} guild
   */
  onGuildDelete(guild) {
    console.log(`[BOT] was kicked from ${guild}`);
  }
}

module.exports = eventHandler;
