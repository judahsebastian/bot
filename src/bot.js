require("dotenv").config();

const { Client } = require("discord.js");

const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});

const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
