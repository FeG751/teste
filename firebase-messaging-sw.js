// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyidXzqqe-rrcF0QrBQ2iSIR_mf0tpMd0",
  authDomain: "seu-projeto-chat.firebaseapp.com",
  projectId: "seu-projeto-chat",
  storageBucket: "seu-projeto-chat.firebasestorage.app",
  messagingSenderId: "259194791953",
  appId: "1:259194791953:web:587ea979f1f26aff2629b0"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Receber notificações em background (quando app está fechado)
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nova Mensagem';
  const notificationOptions = {
    body: payload.notification?.body || 'Você tem uma nova mensagem',
    icon: '/icon-192x192.png', // Adicione um ícone 192x192px
    badge: '/badge-72x72.png', // Adicione um badge 72x72px
    tag: 'nova-mensagem',
    requireInteraction: true,
    data: {
      url: '/'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Clique na notificação
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});

// Log para debug
console.log('[firebase-messaging-sw.js] Service worker carregado e configurado');
