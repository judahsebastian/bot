require("dotenv").config();

const { Client, DiscordAPIError } = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

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

    //creating queue
    const queue = new Map();

    //validating url method
    const validURL = (str) => {
      var regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      return regex.test(str);
    }

    //searching search term
    const voiceChannel = message.member.voice.channel;

    const connection = await voiceChannel.join();

    //If arg is an url link instead of a search term
    if (validURL(messageFragments[1])) {
      const stream = ytdl(messageFragments[1], {filter: "audioonly"});

      connection.play(stream, {seek: 0, volume: 1})
      await message.reply(`Now Playing: ${video.title}`)
      return;
    }

    //yt search terms
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(messageFragments[1]);
    console.log(messageFragments[1]) 

    if (video) { 
      const stream = ytdl(video.url, {filter: "audioonly"});
      connection.play(stream, {seek: 0, volume: 1});
      await message.reply(`Now Playing: ${video.title}`)
    } else {
      message.send("No video was found")
    }
  }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
