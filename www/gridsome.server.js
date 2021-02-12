// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(actions => {
    const commands = actions.addCollection({
      typeName: 'Command'
    })
    commands.addNode({
      id: '0',
      name: 'help',
      syntax: '!help',
      description: 'Shows a short resume of the bots features',
    })
    commands.addNode({
      id: '1',
      name: 'howto',
      syntax: '!howto',
      description: 'Show how to copy ids',
    })
    commands.addNode({
      id: '2',
      name: 'send',
      syntax: '!send <channel_id> <message>',
      description: 'Send a message to the guild channel with the corresponding id',
    })
    commands.addNode({
      id: '3',
      name: 'dm',
      syntax: '!dm <user_id> <message>',
      description: 'Send a message to user',
    })
  })
}
