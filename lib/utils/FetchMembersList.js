/**
 * @param {Discord.client} client
 */
const FetchMembersList = async function (client) {
  for (const members of client.guilds.cache.map(g => g.members)) {
    await members.fetch({ cache: true })
      .then(() => {
        console.log(`${members.cache.size} members on ${members.guild.name} found.`);
      })
      .catch(() => {
        console.log(`Failed fetching users on ${members.guild.name}\n\tMake sure you have SERVER MEMBERS INTENT option enabled.\n\tYou may do it there --> https://discord.com/developers/applications/${this.client.user.id}/bot`);
      });
  }
};
module.exports = FetchMembersList;
