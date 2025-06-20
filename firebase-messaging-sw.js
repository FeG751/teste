// Firebase Cloud Messaging Service Worker

// Importar os scripts do Firebase
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

// Configuração do Firebase (deve ser a mesma do seu app principal)
const firebaseConfig = {
  apiKey: "AIzaSyCyidXzqqe-rrcF0QrBQ2iSIR_mf0tpMd0",
  authDomain: "seu-projeto-chat.firebaseapp.com",
  projectId: "seu-projeto-chat",
  storageBucket: "seu-projeto-chat.firebasestorage.app",
  messagingSenderId: "259194791953",
  appId: "1:259194791953:web:587ea979f1f26aff2629b0"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Obter uma instância do Firebase Messaging
const messaging = firebase.messaging();

// Lidar com mensagens em segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Recebeu mensagem em segundo plano ', payload);
  
  // Configurar opções da notificação
  const notificationTitle = payload.notification?.title || 'Nova mensagem no 7Chat';
  const notificationOptions = {
    body: payload.notification?.body || 'Você recebeu uma nova mensagem',
    icon: payload.notification?.icon || 'https://placehold.co/192x192/4f46e5/ffffff?text=7C',
    badge: 'https://placehold.co/72x72/4f46e5/ffffff?text=7C',
    tag: 'chat-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Abrir Chat'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ],
    data: payload.data
  };

  // Mostrar a notificação
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Lidar com cliques na notificação
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Clique na notificação recebido.', event);

  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Abrir a aplicação quando a notificação for clicada
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Se já existe uma janela aberta, focar nela
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Se não existe janela aberta, abrir uma nova
      if (clients.openWindow) {
        return clients.openWindow(self.location.origin);
      }
    })
  );
});

// Log para debug
console.log('[firebase-messaging-sw.js] Service worker carregado e configurado');
