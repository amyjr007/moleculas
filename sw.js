/* Service worker do app. Guarda tudo na instalação: depois da primeira
   visita, o app abre inteiro sem internet. */
const CACHE = 'moleculas-v200';
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icone-192.png',
  './icone-512.png',
  './imagens/amauri_jr.jpg',
  './imagens/amonia.png',
  './imagens/co2.svg',
  './imagens/copo_agua_recorte.png',
  './imagens/etanol.png',
  './imagens/g.n.lewis.avif',
  './imagens/lewis2.jpg',
  './fontes/atkinson-hyperlegible-400.woff2',
  './fontes/atkinson-hyperlegible-700.woff2',
  './fontes/bricolage-grotesque.woff2',
  './audio/audio_moleculas_0.mp3',
  './audio/audio_moleculas_1.mp3',
  './audio/audio_moleculas_10.1.mp3',
  './audio/audio_moleculas_10.10.mp3',
  './audio/audio_moleculas_10.11.mp3',
  './audio/audio_moleculas_10.11A.mp3',
  './audio/audio_moleculas_10.11B.mp3',
  './audio/audio_moleculas_10.11C.mp3',
  './audio/audio_moleculas_10.12.mp3',
  './audio/audio_moleculas_10.2.mp3',
  './audio/audio_moleculas_10.3.mp3',
  './audio/audio_moleculas_10.4.mp3',
  './audio/audio_moleculas_10.5.mp3',
  './audio/audio_moleculas_10.6.mp3',
  './audio/audio_moleculas_10.7.mp3',
  './audio/audio_moleculas_10.8.mp3',
  './audio/audio_moleculas_10.9.mp3',
  './audio/audio_moleculas_10.mp3',
  './audio/audio_moleculas_10A.mp3',
  './audio/audio_moleculas_10B.mp3',
  './audio/audio_moleculas_10C.mp3',
  './audio/audio_moleculas_10D.mp3',
  './audio/audio_moleculas_10E.mp3',
  './audio/audio_moleculas_10F.mp3',
  './audio/audio_moleculas_11.1.mp3',
  './audio/audio_moleculas_11.1A.mp3',
  './audio/audio_moleculas_11.1B.mp3',
  './audio/audio_moleculas_11.1C.mp3',
  './audio/audio_moleculas_11.2.mp3',
  './audio/audio_moleculas_11.2A.mp3',
  './audio/audio_moleculas_11.3.mp3',
  './audio/audio_moleculas_11.3A.mp3',
  './audio/audio_moleculas_11.3B.mp3',
  './audio/audio_moleculas_11.3C.mp3',
  './audio/audio_moleculas_11.mp3',
  './audio/audio_moleculas_12.1.mp3',
  './audio/audio_moleculas_12.2.mp3',
  './audio/audio_moleculas_12.3.mp3',
  './audio/audio_moleculas_12.4.mp3',
  './audio/audio_moleculas_12.mp3',
  './audio/audio_moleculas_2.mp3',
  './audio/audio_moleculas_3.mp3',
  './audio/audio_moleculas_4.mp3',
  './audio/audio_moleculas_4R.mp3',
  './audio/audio_moleculas_4W.mp3',
  './audio/audio_moleculas_5.mp3',
  './audio/audio_moleculas_6.mp3',
  './audio/audio_moleculas_7.1.mp3',
  './audio/audio_moleculas_7.1A.mp3',
  './audio/audio_moleculas_7.2.mp3',
  './audio/audio_moleculas_7.3.mp3',
  './audio/audio_moleculas_7.4.mp3',
  './audio/audio_moleculas_7.5.mp3',
  './audio/audio_moleculas_7.6.mp3',
  './audio/audio_moleculas_7.7.mp3',
  './audio/audio_moleculas_7.8.mp3',
  './audio/audio_moleculas_7.A.mp3',
  './audio/audio_moleculas_7.mp3',
  './audio/audio_moleculas_8.1.mp3',
  './audio/audio_moleculas_8.2.mp3',
  './audio/audio_moleculas_8.3.mp3',
  './audio/audio_moleculas_8.4.mp3',
  './audio/audio_moleculas_8.5.mp3',
  './audio/audio_moleculas_8.6.mp3',
  './audio/audio_moleculas_8.7.mp3',
  './audio/audio_moleculas_8.mp3',
  './audio/audio_moleculas_9.1.mp3',
  './audio/audio_moleculas_9.2.mp3',
  './audio/audio_moleculas_9.3.mp3',
  './audio/audio_moleculas_9.4.mp3',
  './audio/audio_moleculas_9.5.mp3',
  './audio/audio_moleculas_9.6.mp3',
  './audio/audio_moleculas_9.7.mp3',
  './audio/audio_moleculas_9.mp3',
  './audio/funfare.mp3',
  './audio/vfx/agoraesse.mp3',
  './audio/vfx/applause.mp3',
  './audio/vfx/electron_jumping.mp3',
  './audio/vfx/error.mp3',
  './audio/vfx/flip.mp3',
  './audio/vfx/lowscore.mp3',
  './audio/vfx/maisessa.mp3',
  './audio/vfx/maisesse.mp3',
  './audio/vfx/proxima.mp3',
  './audio/vfx/pr%C3%B3ximo.mp3',
  './audio/vfx/right.mp3',
  './audio/vfx/rupture.mp3',
  './audio/vfx/s%C3%B3maisesse.mp3',
  './audio/vfx/transition_cube.mp3',
  './audio/vfx/typing%20sound.mp3',
  './audio/vfx/yes.mp3',
  './libs/three.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE)
    /* 'reload' força cada arquivo a vir da rede, e não do cache HTTP do
       navegador (o GitHub Pages manda guardar por dez minutos). */
    .then(c => c.addAll(ARQUIVOS.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  /* A página vem da rede quando há rede, para que uma versão nova apareça
     logo no primeiro recarregamento. Sem rede, o cache assume. */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request.url, { cache: 'reload' }).then(resp => {
        const copia = resp.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copia));
        return resp;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* o resto (imagens, ícones, fontes, áudios) sai do cache */
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp && resp.status === 200) {
        const copia = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia));
      }
      return resp;
    }))
  );
});
