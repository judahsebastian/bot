require("dotenv").config();

const { Client } = require("discord.js");

const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});

const PREFIX = "-";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

const isPlayCommandValid = (commandFragments) => {
  if (commandFragments.length !== 2) {
    return false;
  }
  if (commandFragments[0] !== "-play") {
    return false;
  }
  return true;
};

//Gets all voice channels in server
const getAllVoiceChannels = (message) => {
  const voiceChannels = message.guild.channels.cache.filter(
    (channel) => channel.type === "voice"
  );

  return voiceChannels;
};

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content === "-leave") {
    message.guild.me.voice.channel.leave();
  }
  if (message.content.startsWith(PREFIX)) {
    const messageFragments = message.content.split(" ");
    if (!isPlayCommandValid(messageFragments)) {
      console.log("Invalid play command");
      return;
    }

    const url = messageFragments[1];

    if (message.channel.type !== "voice") {
      console.log("You must be in a voice channel to use that command");
    }

    // Joins the channel of the person who requested it
    const voiceChannels = getAllVoiceChannels(message);
    for (const [channelID, channel] of voiceChannels) {
      for (const [memberID, member] of channel.members) {
        channel.join(channelID);
      }
    }
  }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
