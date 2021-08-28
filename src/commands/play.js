const ytdl = require("ytdl-core")
const ytSearch = require("yt-search")

let song = {};
let url = "https://www.youtube.com/watch?v=5qap5aO4i9A";
let search = "lofi hip hop radio";

if (ytdl.validateURL(url)) {
    const songInfo = await ytdl.getInfo(url)
    song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
} else {
    //Not URL format
    const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        return (VideoResult.videos.length > 1) ? videoResult[0] : null;
    }

    if (video){

    }
}

