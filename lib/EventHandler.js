const { prefix, adminId } = require('../config.json');
const send = require('./commands/send');
const dm = require('./commands/dm');
const help = require('./commands/help');
const howto = require('./commands/howto');

const commandList = [
  'send',
  'dm',
  'help',
  'howto'
];

class eventHandler {
  /**
   *
   * @param {Discord.client} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   *
   * @param {string} logMessage
   */
  adminLog(logMessage) {
    const admin = this.client.users.cache.get(adminId);
    if (admin) admin.send(logMessage);
  }

  async onReady() {
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
    this.adminLog(`Up. Logged in as ${this.client.user.tag}\nCurrently serveing ${this.client.guilds.cache.size} servers`);
    console.log(`Logged in as ${this.client.user.tag}`);
    return;
  }

  /**
   *
   * @param {Discord.message} message
   */
  async onMessage(message) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const user = this.client.users.cache.get(message.author.id);

    // Ignore message if prefix is not providen
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // And if message was sent not from bot dm
    if (message.channel.type !== 'dm') {
      if (!commandList.includes(command)) return;
      user.send('Use this channel to send an anonymous message');
      return;
    }

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
    this.adminLog(`Invited to ${guild}\nCurrently serving ${this.client.guilds.cache.size} servers`);
    console.log(`[BOT] Connected to ${guild}`);
  }

  /**
   *
   * @param {Discord.guild} guild
   */
  onGuildDelete(guild) {
    this.adminLog(`Kicked from ${guild}\nCurrently serving ${this.client.guilds.cache.size} servers`);
    console.log(`[BOT] Kicked from ${guild}`);
  }
}

module.exports = eventHandler;
