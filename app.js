const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

const tk = process.env.DISCORD_TOKEN || token;
client.login(tk);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Listening for messages 
client.on('message', msg => {
  // Ignore message if prefix not providen
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  // Read about shift() : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
  const command = args.shift().toLowerCase();
  // User DM
  const user = client.users.cache.get(msg.author.id);

  if (command === 'help') {
    const embed = new Discord.MessageEmbed()
      .setTitle('Anonimalus')
      .setColor(0x000000)
      .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.winudf.com%2Fv2%2Fimage%2FY29tLmRpbGFkYW5nLmFub255bW91cy5tYXNrX2ljb25fMF8xMTM0M2E1OA%2Ficon.png%3Fw%3D170%26fakeurl%3D1%26type%3D.png&f=1&nofb=1')
      .setDescription('Anonimalus 2ch. Send messages to the servername#channelname and nobody will now that it\'s from you')
      .addFields(
        { name: `${prefix}help`, value: 'Shows the help info'},
        { name: `${prefix}send <channelId> <message>`, value: 'Send a message as incognito\nTo get channelID: right click on text channel where you want message to be sent, then click \'coppy id\'\n'},
        { name: `${prefix}dm <userId> <message>`, value: 'Send a DM as incognito\nTo get userId: right click on user who you want text, then click \'coppy id\'\n'},
        { name: `${prefix}stats`, value: 'Show statistics about anonimalus usage'},
        { name: 'Invite url', value: '[click](https://discord.com/oauth2/authorize?client_id=751570908065300481&scope=bot&permissions=256064)'}
      )
      .setFooter('anonimalus', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.icons8.com%2Fdotty%2F72%2Fanonymous-mask.png&f=1&nofb=1');

    // Sends the embed to the user who asked for help.
    // Reply will be sent directly to user's DM
    user.send(embed);
  }

  // Send message to the channel of the certain guild   
  if (command === 'send') {
    if (msg.channel.type !== 'dm') {
      user.send('Use this channel to send an anonimous message');
      return;
    }
    // Send command syntax: !Send <channelId> <Message>
    const channelId = args.shift();
    const message = args.join(' ');
    if (message == '') {
      user.send('Error: Empty input!');
      return;
    }

    if (!isFinite(String(channelId))) {
      user.send(`ERROR: Wrong channel id. Syntax: '${prefix}send <channelId> <message>'`);
      return;
    }
    else {
      try {
        const messageEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setTitle('Anonimous message')
          .setDescription(message)
          .setFooter('Anonimalus', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.icons8.com%2Fdotty%2F72%2Fanonymous-mask.png&f=1&nofb=1');

        const channel = client.channels.cache.get(channelId);
        const guildId = channel.guild.id;
        const channelUrl = `https://discordapp.com/channels/${guildId}/${channelId}`;

        channel.send(messageEmbed);

        const replyEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setTitle('Success')
          .setDescription('Message was sent to')
          .addFields(
            { name: `${channel.guild}#${channel.name}`, value: `[go](${channelUrl})` }
          );
        user.send(replyEmbed);
      }
      catch(e) {
        console.error(e.message);
        user.send('Error was occured!');
      }
    }
    return;
  }

  // Send message to DM
  if (command === 'dm') {
    if (msg.channel.type !== 'dm') {
      user.send('Use this channel to send an anonimous message');
      return;
    }
    // Send command syntax: !dm <userId> <Message>
    const userId = args.shift();
    const message = args.join();
    if (message == '') {
      user.send('Error: Empty input!');
      return;
    }

    if (!isFinite(String(userId))) {
      user.send(`ERROR: Wrong user id. Syntax: '${prefix}dm <userId> <message>'`);
      return;
    }
    else {
      try {
        const messageEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setTitle('You\'ve got an anonimous message')
          .setDescription(message)
          .setFooter('Anonimalus', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.icons8.com%2Fdotty%2F72%2Fanonymous-mask.png&f=1&nofb=1');

        const channel = client.users.cache.get(userId);
        channel.send(messageEmbed);

        const replyEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setTitle('Success')
          .setDescription('Message was sent to')
          .addFields(
            { name: `${channel.name}`, value: '_' }
          );
        user.send(replyEmbed);
      }
      catch(e) {
        console.error(e.message);
        user.send('Error was occured!');
      }
    }
    return;
  }
});

client.on('message', message => {
  console.log(message.content);
});
