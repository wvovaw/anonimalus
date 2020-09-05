const { prefix, token } = require('.\\config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// 
client.on('message', msg => {
  // Ignore message if prefix not providen
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  // Return help information in embed
  if (msg.content === `${prefix}help`) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Anonimalus')
      .setColor(0x000000)
      .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.winudf.com%2Fv2%2Fimage%2FY29tLmRpbGFkYW5nLmFub255bW91cy5tYXNrX2ljb25fMF8xMTM0M2E1OA%2Ficon.png%3Fw%3D170%26fakeurl%3D1%26type%3D.png&f=1&nofb=1')
      .setDescription('Anonimalus 2ch. Send messages to the %servername#chanelname% and nobody will now that it\'s from you')
      .addFields(
        { name: `${prefix}help`, value: 'Shows the help info'},
        { name: `${prefix}send`, value: 'Send a message as incognito'},
        { name: `${prefix}stats`, value: 'Show statistics about anonimalus usage'},
        { name: `${prefix}invite`, value: 'Get a URL to invite this bot'}
      )
      .setFooter('Fack society', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.icons8.com%2Fdotty%2F72%2Fanonymous-mask.png&f=1&nofb=1');
    msg.reply(embed);
  }

  // Send comand
  // TODO: Read about args...
  if (msg.content === `${prefix}send`) {
    console.log('We are asked to send message ${2} to ${1} server#chanel');
    return;
  }
});

client.on('message', message => {
  console.log(message.content);
});
