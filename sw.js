// USMLE Review Tool - Service Worker for PWA functionality

const CACHE_NAME = 'usmle-review-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/questions.js',
  '/manifest.json'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // Otherwise, fetch from network
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response before caching
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error);
            
            // Return a fallback page for navigation requests when offline
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            throw error;
          });
      })
  );
});

// Background sync for future offline functionality
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

// Push notifications for study reminders (future feature)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push message received');
  
  const options = {
    body: 'Time for your USMLE review session!',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'study',
        title: 'Start Studying',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Later'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('USMLE Review Reminder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event.action);
  
  event.notification.close();

  if (event.action === 'study') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Utility functions
async function syncProgress() {
  // Future implementation for syncing progress data
  console.log('Service Worker: Syncing progress data...');
  
  try {
    // This would sync local storage data with a backend if implemented
    const progressData = await getLocalProgressData();
    console.log('Service Worker: Progress data synced', progressData);
  } catch (error) {
    console.error('Service Worker: Progress sync failed', error);
  }
}

async function getLocalProgressData() {
  // Simulate getting data from IndexedDB or localStorage
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ synced: true, timestamp: Date.now() });
    }, 1000);
  });
}

// Handle service worker updates
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Cache versioning and updates
const updateCache = async () => {
  console.log('Service Worker: Updating cache...');
  
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_CACHE_URLS);
    console.log('Service Worker: Cache updated successfully');
  } catch (error) {
    console.error('Service Worker: Cache update failed', error);
  }
};

// Periodic cache refresh (when app is in background)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'refresh-cache') {
    event.waitUntil(updateCache());
  }
});