<template>
    <Layout>
      <div class="baner">
        <g-image src="~/assets/images/anon.png" />
      </div>
      <div class="description">
        <div class="glitch-text-container">
          <h3 class="title glitch-text">The Anonimalus.</h3>
        </div>
        <p>The discord bot, that sends all what you say to discord clients and guild channels.</p>
        <p><a href="https://discord.com/oauth2/authorize?client_id=751570908065300481&scope=bot&permissions=256064">Invite</a> it to your server, or the server you want to communicate with anonymously, and it will be able to send messages to the server members*</p>
        <p>If you're going to use this instance of Anonimalus, you'll be able to send messages from <g-link to="/send">here</g-link></p>
        <p>The source code of the bot, this static website and the message api placed <a href="https://github.com/wvovaw/anonimalus">here</a></p>
        <p class="clarify">* User should have enabled option "Allow direct messages from server members"</p>
      </div>
      <hr>
      <div class="commands">
        <h3>Commands</h3>
        <table>
          <thead>
            <tr>
              <th>Command</th>
              <th>Syntax</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edge in $page.commands.edges" :key="edge.node.id">
              <td>{{ edge.node.name }}</td>
              <td>{{ edge.node.syntax }}</td>
              <td>{{ edge.node.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div class="contact">
        <h3>Contacts</h3>
        <nav class="nav">
          <a class="nav__link" title="My GitHub" href="https://github.com/wvovaw">
            <svg viewBox="0 0 100 100" aria-hidden="true" role="img">
              <path clip-rule="evenodd" d="M50 5.7C24.9 5.7 4.5 26 4.6 51.2c0 19.6 12.5 36.9 31.1 43.1 2.3.4 3.1-1 3.1-2.2s0-3.9-.1-7.7c-12.6 2.7-15.3-6.1-15.3-6.1-2.1-5.3-5-6.7-5-6.7-4.1-2.9.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 6.9 10.6 4.9 13.2 3.8.2-2.3 1.2-4.5 2.9-6.1-10.2-1.1-20.8-5-20.8-22.5-.1-4.5 1.6-8.9 4.7-12.2-.5-1.1-2-5.7.4-12 0 0 3.8-1.2 12.5 4.7 7.4-2 15.3-2 22.8 0 8.7-5.9 12.4-4.7 12.4-4.7 2.5 6.3 1 10.9.5 12 3.1 3.3 4.8 7.7 4.7 12.2 0 17.5-10.6 21.4-20.8 22.4 1.6 1.4 3.1 4.2 3.1 8.4 0 6.1-.1 11-.1 12.4 0 1.2.8 2.6 3.1 2.2 23.8-8 36.6-33.8 28.6-57.6C86.8 18.2 69.5 5.7 50 5.7z" fill="currentColor" fill-rule="evenodd">
              </path>
            </svg>
          </a>
          <a class="nav__link" title="Message me" href="https://t.me/gerserk">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 189.473 189.473" style="enable-background:new 0 0 189.473 189.473;" xml:space="preserve" fill="currentColor" fill-rule="evenodd">
              <path d="M152.531,179.476c-1.48,0-2.95-0.438-4.211-1.293l-47.641-32.316l-25.552,18.386c-2.004,1.441-4.587,1.804-6.914,0.972
                c-2.324-0.834-4.089-2.759-4.719-5.146l-12.83-48.622L4.821,93.928c-2.886-1.104-4.8-3.865-4.821-6.955
                c-0.021-3.09,1.855-5.877,4.727-7.02l174.312-69.36c0.791-0.336,1.628-0.53,2.472-0.582c0.302-0.018,0.605-0.018,0.906-0.001
                c1.748,0.104,3.465,0.816,4.805,2.13c0.139,0.136,0.271,0.275,0.396,0.42c1.11,1.268,1.72,2.814,1.835,4.389
                c0.028,0.396,0.026,0.797-0.009,1.198c-0.024,0.286-0.065,0.571-0.123,0.854L159.898,173.38c-0.473,2.48-2.161,4.556-4.493,5.523
                C154.48,179.287,153.503,179.476,152.531,179.476z M104.862,130.579l42.437,28.785L170.193,39.24l-82.687,79.566l17.156,11.638
                C104.731,130.487,104.797,130.533,104.862,130.579z M69.535,124.178l5.682,21.53l12.242-8.809l-16.03-10.874
                C70.684,125.521,70.046,124.893,69.535,124.178z M28.136,86.782l31.478,12.035c2.255,0.862,3.957,2.758,4.573,5.092l3.992,15.129
                c0.183-1.745,0.974-3.387,2.259-4.624L149.227,38.6L28.136,86.782z"/>
            </svg>
          </a>
        </nav>
      </div>
    </Layout>
</template>

<page-query>
query {
    commands: allCommand {
        edges {
            node {
                id
                name
                syntax
                description
            }
        }
    }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Anonimalus: A discord bot for anonymous communication'
  }
}
</script>

<style lang="css" scoped>
@import '../assets/styles/glitch.css';

.glitch-text-container {
  text-align: center;
  font-family: Poppins;
}
.baner {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
p.clarify {
  font-size: 0.5em;
  color: rgb(56, 56, 56);
  padding: 0;
  text-align: center;
}
h3.title {
  text-align: center;
}
table {
  font-size: 0.8em;
  width: 100%;
}
table, td {
  border: 1px solid white;
  margin: 0 0 30px;
}
td {
  height: 2em;
  padding: 5px 10px 5px 10px;
}
svg {
  height: 2em;
  margin: 20px 4% 20px 4%;
}
</style>
