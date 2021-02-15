const { prefix, adminId } = require('../config.json');
const send = require('./commands/send');
const dm = require('./commands/dm');
const help = require('./commands/help');
const howto = require('./commands/howto');
const ApiMessageToChannel = require('./api/messageToChannel');
const ApiMessageToUser = require('./api/messageToUser');

const commandList = {
  send,
  dm,
  help,
  howto
};

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
    // Fetching users
    for (let members of this.client.guilds.cache.map(g => g.members)) {
      await members.fetch({cache: true})
        .then(() => {
          console.log(`${members.cache.size} members on ${members.guild.name} found.`);
        })
        .catch(() => {
          console.log(`Failed fetching users on ${members.guild.name}\n\tMake sure you have SERVER MEMBERS INTENT option enabled.\n\tYou may do it there --> https://discord.com/developers/applications/${this.client.user.id}/bot`);
        });
    }

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
    const logMessage = `Logged in as ${this.client.user.tag}\nServeing ${this.client.users.cache.size} users, in ${this.client.channels.cache.size} channels of ${this.client.guilds.cache.size} guilds.`;
    this.adminLog(logMessage);
    console.log(logMessage);
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
      if (!commandList[command]) return;
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

  /**
   *
   * @param {Discord.guild.channel.id} channelId
   * @param {String} message
   */
  async onApiMessageToChannel(channelId, message) {
    return await ApiMessageToChannel(this.client, channelId, message);
  }
  async onApiMessageToUser(userId, message) {
    return await ApiMessageToUser(this.client, userId, message);
  }
}

module.exports = eventHandler;
