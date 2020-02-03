var staticCache = 'v0.002';
var files = [
	'/'
];


// Install
self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache
                .addAll(files)
                .then(() => console.log('App Version: ' + staticCache))
                .catch(err => console.error('Error adding files to cache', err));
        }),
    );
});

// Activate
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== staticCache) {
                        console.info('Deleting Old Cache', cache);
                        return caches.delete(cache);
                    }
                }),
            );
        }),
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});

async function cacheFirst(req) {
    let cacheRes = await caches.match(req);
    return cacheRes || fetch(req);
}

async function networkFirst(req) {
    const dynamicCache = await caches.open('dynamic');
    try {
        const networkResponse = await fetch(req);
        if (req.method !== 'POST') dynamicCache.put(req, networkResponse.clone());
        return networkResponse;
    } catch (err) {
        const cacheResponse = await caches.match(req);
        return cacheResponse;
    }
}

