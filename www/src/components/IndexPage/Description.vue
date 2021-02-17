<template>
<div class="Description">
  <div class="baner">
    <a href="https://discord.com/oauth2/authorize?client_id=751570908065300481&scope=bot&permissions=256064">
      <g-image src="~/assets/images/anon.png" title="Invite Anonimalus"/>
    </a>
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
</div>
</template>

<style scoped>
@import '../../assets/styles/glitch.css';

.glitch-text-container {
  text-align: center;
  font-family: Poppins;
}
.header {
  display: flex;
  flex-direction: column;
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
</style>
