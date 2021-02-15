[![Discord](https://img.shields.io/badge/Anonimalus-Invite-99AAB5?style=flat-square&logo=Discord&labelColor=7289DA&logoColor=white)](https://discord.com/oauth2/authorize?client_id=751570908065300481&scope=bot&permissions=256064)
[![CodeFactor](https://www.codefactor.io/repository/github/wvovaw/anonimalus/badge)](https://www.codefactor.io/repository/github/wvovaw/anonimalus)

<h1 align="center">The Anonimalus</h1>
<p align="center">
  <img src="./blob/anon.png" alt="Anonimalus">
</p>

# Description

> Send anonymous messages to channels on servers where this bot is available.
Also you can send anonymous messages directly to users who has at least one common server with this bot.

## Commands

| Command | Syntax | Description |
|---------|--------|-------------|
| dm | !dm *user_id* *message* | Send a message to user
| send | !send *channel_id* *message* | Send a message to guild channel |
| howto | !howto | Show how to copy ids |
| help | !help | Show a short resume of bots features |

It is also possible to send messages from [this site page](https://wvovaw.github.io/anonimalus/send).

# Project structure

- Main codebase `/*`
  - Bot `/lib/commands/*`, `/lib/EventHandler.js`
  - Api `/lib/api/*`
- Website `/www`

Both of them has their own `node_modules`

# Quick start

## Clone and install dependencies

```sh
git clone https://github.com/wvovaw/anonimalus.git
cd anonimalus
npm install
```
## Register new discord app

1. Go to [devportal](https://discord.com/developers/applications)
2. Create new app, go to `bot` section
3. Copy a secret token
4. Make sure `SERVER MEMBERS INTENT` option is enabled
5. Save

## Authentication

Create `.env` file and set DISCORD_TOKEN variable in there.

```sh
echo DISCORD_TOKEN="YourTokenGoesHere" > .env
```

### *nix shells

```sh
export DISCORD_TOKEN=your_token_goes_here
```

### Windows

```powershell
set DISCORD_TOKEN=your_token_goes_here
```

## Run bot

```sh
npm start
```

This setup runs localy on your machine, or on VDS/VPS

# Deploying on Heroku

1. Fork this repo
2. Sign up on [Heroku](https://heroku.com)
3. Connect your github
4. Create new dino from your github repo
5. Add DISCORD_TOKEN in variables ([*how to*](https://devcenter.heroku.com/articles/config-vars))
6. Sign up [here](https://cron-job.org) and create a cron job that will ping your app every 15-30 minutes to keep your app alive

# Website

## Developing
Go to `/www` directory and run

```sh
gridsome develop
```
It will run developing server with hot reload

## Build and deploy

Compile the static website to `/dist` directory
```sh
npm run web-build
```

Before you perform deploying, add your repository as origin

```sh
git add origin https://github.com/yourname/reponame
```

Push the `/dist` dir to the remote on gh-pages branch. The site will be avaliable at **https://*yourname*.github.io/anonimalus**

```sh
npm run web-deploy
```

## If you want to use the website to send messages

>Make sure the last 2 lines is not commented out in `app.js`

```js
const { start } = require('./lib/api/server');
start(eventHandler);
```

>Change the url of POST request in `Anonimalus\www\src\components\Form.vue`

```js
axios({
  method: 'post',
  url: 'https://yourappname.herokuapp.com/send',
  data: d
  })
  ...
```
