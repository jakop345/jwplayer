export default function createPlayPromise(video) {
    return new Promise(function(resolve, reject) {
        if (video.paused) {
            return reject(new Error('Play refused.'));
        }
        const removeEventListeners = function() {
            video.removeEventListener('play', playListener);
            video.removeEventListener('playing', listener);
            video.removeEventListener('pause', listener);
            video.removeEventListener('abort', listener);
            video.removeEventListener('error', listener);
        };
        const playListener = function() {
            video.addEventListener('playing', listener);
            video.addEventListener('abort', listener);
            video.addEventListener('error', listener);
            video.addEventListener('pause', listener);
        };
        const listener = function(e) {
            removeEventListeners();
            if (e.type === 'playing') {
                resolve();
            } else {
                reject(new Error('The play() request was interrupted by a "' + e.type + '" event.'));
            }
        };
        video.addEventListener('play', playListener);
    });
}
