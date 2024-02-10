const videoFileUrls = [
  "lofi_girl",
  "lofi_girl_balcony",
  "spirited_away_train",
  "train",
].map((v) => `/videos/${v}.mp4`);

window.caches
  .open("video-pre-cache")
  .then((cache) =>
    Promise.all(
      videoFileUrls.map((videoFileUrl) => fetchAndCache(videoFileUrl, cache))
    )
  );

const fetchAndCache = (videoFileUrl, cache) => {
  return cache.match(videoFileUrl).then((cacheResponse) => {
    if (cacheResponse) {
      return cacheResponse;
    }
    return fetch(videoFileUrl).then((networkResponse) => {
      cache.put(videoFileUrl, networkResponse.clone());
      return networkResponse;
    });
  });
};
