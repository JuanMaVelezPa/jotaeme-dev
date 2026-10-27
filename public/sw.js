// Bump the suffix to invalidate old caches on a content release.
const CACHE = 'jm-shell-v2';

const PRECACHE = [
	'/',
	'/es/',
	'/fonts/InterTight-Variable.woff2',
	'/fonts/JetBrainsMono-Regular.woff2',
	'/fonts/JetBrainsMono-Medium.woff2',
	'/fonts/JetBrainsMono-ExtraBold.woff2',
	'/android-chrome-192.png',
	'/android-chrome-512.png',
	'/apple-touch-icon.png',
	'/favicon.ico',
	'/favicon.svg',
	'/site.webmanifest',
	'/cv/Juan_Manuel_Velez_Java_Backend_Engineer_CV_EN.pdf',
	'/cv/Juan_Manuel_Velez_Desarrollador_Backend_Java_CV_ES.pdf',
];

// Cached when reachable, but a failure here must not abort the install.
const OPTIONAL = ['/404'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then(async (cache) => {
			await cache.addAll(PRECACHE);
			await Promise.allSettled(OPTIONAL.map((url) => cache.add(url)));
		}),
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
			.then(() => self.clients.claim()),
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET' || request.headers.has('range')) return;
	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;

	// Pages and CVs keep the same URL when their content changes: network first.
	const fresh = request.mode === 'navigate' || url.pathname.endsWith('.pdf');
	event.respondWith(fresh ? networkFirst(request) : cacheFirst(request));
});

async function store(request, response) {
	if (!response.ok) return;
	const cache = await caches.open(CACHE);
	await cache.put(request, response);
}

async function networkFirst(request) {
	try {
		const response = await fetch(request);
		store(request, response.clone());
		return response;
	} catch (error) {
		const cached = await caches.match(request);
		if (cached) return cached;
		if (request.mode === 'navigate') {
			const shell = await caches.match('/');
			if (shell) return shell;
		}
		throw error;
	}
}

// Everything else (fonts, icons, hashed /_astro files) does not change under the same URL.
async function cacheFirst(request) {
	const cached = await caches.match(request);
	if (cached) return cached;
	const response = await fetch(request);
	store(request, response.clone());
	return response;
}
