const CACHE_NAME = "meutreino-cache-v1";
const URLS_TO_CACHE = [
  "/MeuTreino/",            // raiz
  "/MeuTreino/index.html",  // página inicial
  "/MeuTreino/todos-exercicios.html",
  "/MeuTreino/biblioteca-de-treinos.html",
  "/MeuTreino/calculadora-de-saude.html",
  "/MeuTreino/personal-trainer.html",
  "/MeuTreino/baixar-aplicativo.html", 
  "/MeuTreino/sobre.html",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
  "https://raw.githubusercontent.com/gymbr/meutreino/refs/heads/main/img/icone_treino.jpg",
  "https://raw.githubusercontent.com/gymbr/meutreino/refs/heads/main/img/anuncie_aqui.gif",
  "https://raw.githubusercontent.com/gymbr/meutreino/refs/heads/main/img/personal1.gif",
  "https://raw.githubusercontent.com/gymbr/meutreino/refs/heads/main/img/download1.png",
  "https://raw.githubusercontent.com/gymbr/meutreino/refs/heads/main/img/download2.png",
  "https://raw.githubusercontent.com/gymbr/meutreino/refs/heads/main/img/download3.png"
];

// Instala e adiciona arquivos ao cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Ativa e remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercepta requisições e responde do cache primeiro
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
