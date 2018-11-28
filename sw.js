const CACHE_NAME='mi_cache_prueba';

var UrlsToCache=[
  './',
  './estilos/banner.css',
	'./estilos/blog.css',
	'./estilos/contenedor.css',
	'./estilos/info.css',
	'./estilos/menu.css',
  './imagenes/a1.jpg',
	'./imagenes/a2.jpg',
	'./imagenes/a3.jpg',
	'./imagenes/p1.jpg',
	'./imagenes/p2.jpg',
	'./imagenes/p3.jpg',
	'./imagenes/p4.jpg',
	'./imagenes/fondo.jpg',
	'./imagenes/favicon.png',
  './imagenes/favicon-1024.png',
  './imagenes/favicon-128.png',
  './imagenes/favicon-16.png',
  './imagenes/favicon-512.png',
  './imagenes/favicon-384.png',
  './imagenes/favicon-256.png',
  './imagenes/favicon-192.png',
  './imagenes/favicon-96.png',
  './imagenes/favicon-64.png',
  './imagenes/favicon-16.png',
];

//evento install (de instalación )
//instalación y guardar en cache los recursos estáticos
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(UrlsToCache)
      .then(()=>{
        self.skipWaiting();
      });
    }).catch(err=>
      console.log('no se ha registrado el cache',err)));
});

//evento activate activar la aplicación
//este evento es el que hace que funcione sin conexion
self.addEventListener('activate',e=>{
  const cacheWhiteList=[CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then(cacheNames =>{
        return Promise.all(cacheNames.map(cacheName=>{
          if(cacheWhiteList.indexOf(cacheName)===- 1){
              //borramos los elementos que no necesitamos
              return caches.delete(cacheName);
          }
        })
       );
     })
     .then(()=>{
       //activa la cache en el dispositivo
        self.clients.claim();
     })
  );
});

//evento fetch traer desde el internet
//comprobarra si la url está en cache y si no la solicita por internet
self.addEventListener('fetch',e=>{
    e.respondWith(
      caches.match(e.request)
        .then(res=>{
          if(res){
            //devuelvo datos desde caches
            return res;
          }
          return fetch(e.request);
        })
    );
});
