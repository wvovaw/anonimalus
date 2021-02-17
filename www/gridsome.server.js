// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(actions => {
    const commands = actions.addCollection({
      typeName: 'Command'
    });
    commands.addNode({
      id: '0',
      name: 'help',
      syntax: '!help',
      description: 'Shows a short resume of the bots features',
    });
    commands.addNode({
      id: '1',
      name: 'howto',
      syntax: '!howto',
      description: 'Show how to copy ids',
    });
    commands.addNode({
      id: '2',
      name: 'send',
      syntax: '!send <channel_id> <message>',
      description: 'Send a message to the guild channel with the corresponding id',
    });
    commands.addNode({
      id: '3',
      name: 'dm',
      syntax: '!dm <user_id> <message>',
      description: 'Send a message to user',
    });
  });

  api.loadSource(actions => {
    const faq = actions.addCollection({
      typeName: 'Question'
    });
    faq.addNode({
      id: '0',
      question: 'Can I set my own instance up?',
      answer: 'Yes. You can clone the bot from github repo and follow the instruction in readme. Feel free to contact me if something goes not smooth.'
    });
    faq.addNode({
      id: '1',
      question: 'What if somebody ask you to hand over sender\'s data?',
      answer: 'It is impossible. Message events not saving or logging. So, there\'s no data that could be revealed'
    });
    faq.addNode({
      id: '2',
      question: 'Is it possible to reveal sender\'s name/tag/id?',
      answer: 'No. Only if user himself send you his data. But who knows, maybe it\'s fake?'
    });
    faq.addNode({
      id: '3',
      question: 'Does it collet any data?',
      answer: 'No. The bot has no any data stores. It also does not log any message events.'
    });
  });

}
