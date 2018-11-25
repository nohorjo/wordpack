self.addEventListener('fetch', event => {
    caches.open('wordpack').then(cache => {
            event.respondWith(
                caches.open('mysite-dynamic')
                    .then(cache => cache.match(event.request))
                    .then(response => {
                        const update = fetch(event.request).then(response => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                        return response || update;
                    })
            );
    });
});
