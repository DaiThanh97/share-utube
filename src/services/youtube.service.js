const axios = require('axios');
const { STATUS_CODE } = require('../configs/constants');

exports.getDataFromYoutube = async (url) => {
    const videoId = url.split('v=')[1];
    const ampersandPos = videoId.indexOf('&');
    if (ampersandPos !== -1) {
        videoId = videoId.substring(0, ampersandPos);
    }

    // Call Get Data
    const { status, data } = await axios.get(`${process.env.GOOGLE_APIS_URL}?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,statistics`);
    if (status === STATUS_CODE.SUCCESS) {
        const { snippet, statistics } = data.items[0];
        const youtubeData = {
            title: snippet.title,
            likeCount: statistics.likeCount,
            dislikeCount: statistics.dislikeCount,
            description: snippet.description
        };
        return youtubeData;
    }
    return null;
}