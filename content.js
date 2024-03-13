function getVideoId() {
    const url = window.location.href;
    const start = url.indexOf('v=') + 2;
    if (start === -1) return null;
    const end = url.indexOf('&', start);
    return end !== -1 ? url.substring(start, end) : url.substring(start);
}

async function getInfo(videoId) {
    try {
        const response = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`);
        const data = await response.json();
        const likeCount = data.likes;
        const dislikeCount = data.dislikes;
        const viewCount = data.viewCount;
        const rating = data.rating;
        return { likeCount, dislikeCount, viewCount, rating };
    } catch (error) {
        chrome.runtime.sendMessage({ header: 'log', payload: error });
    }
}

function renderRatio(info) {
    let intervalId = setInterval(() => {
        console.log('waiting');
        let container = document.getElementById('top-level-buttons-computed');
        if (container) {
            const secondElement = container.children[1];

            const ratioElement = document.createElement('div');
            ratioElement.id = 'ratio-element';
            ratioElement.innerHTML = (info.likeCount / (info.likeCount + info.dislikeCount) * 100).toFixed(2) + '%';
            container.insertBefore(ratioElement, secondElement);
            
            clearInterval(intervalId);
        }
    }, 100);
}

//!  ---  LISTENER  ---  !//
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    if (request.header === 'complete') {
        videoId = getVideoId();
        info = await getInfo(videoId);
        renderRatio(info);
    }

});
