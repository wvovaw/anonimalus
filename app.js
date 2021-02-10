'use strict';

const { token } = require('./config.json');
const EventHandler = require('./lib/EventHandler');
const { Client } = require('discord.js');

// Loggin
const tk = process.env.DISCORD_TOKEN || token;
const client = new Client();
client.login(tk);

// Events
const eventHandler = new EventHandler(client);
client.on('ready', () => eventHandler.onReady());
client.on('guildCreate', (guild) => eventHandler.onGuildInvite(guild));
client.on('guildDelete', (guild) => eventHandler.onGuildDelete(guild));
client.on('message', (message) => eventHandler.onMessage(message));

// Recieve messages using API
const { start } = require('./lib/api/server');
start(eventHandler);
