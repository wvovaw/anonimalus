'use strict';

require('dotenv').config({path: __dirname + '/.env'});
const EventHandler = require('./lib/EventHandler');
const { Client } = require('discord.js');

// Loggin
const client = new Client();
client.login(process.env.DISCORD_TOKEN);

// Events
const eventHandler = new EventHandler(client);
client.on('ready', () => eventHandler.onReady());
client.on('guildCreate', (guild) => eventHandler.onGuildInvite(guild));
client.on('guildDelete', (guild) => eventHandler.onGuildDelete(guild));
client.on('message', (message) => eventHandler.onMessage(message));

// Recieve messages using API
const { start } = require('./lib/api/server');
start(eventHandler);
