// Importa os scripts do Firebase (necessário para service workers)
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// =========================================================================================
// CONFIGURAÇÃO DO SEU PROJETO FIREBASE
// =========================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyCyidXzqqe-rrcF0QrBQ2iSIR_mf0tpMd0",
  authDomain: "seu-projeto-chat.firebaseapp.com",
  databaseURL: "https://seu-projeto-chat-default-rtdb.firebaseio.com",
  projectId: "seu-projeto-chat",
  storageBucket: "seu-projeto-chat.firebasestorage.app",
  messagingSenderId: "259194791953",
  appId: "1:259194791953:web:587ea979f1f26aff2629b0"
};


// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Manipulador de mensagens em segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png' // Certifique-se que este ícone existe no seu projeto
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manipulador de clique na notificação
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Se a janela do chat já estiver aberta, foca nela
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Se não, abre uma nova janela
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

console.log('[firebase-messaging-sw.js] Service worker carregado e configurado.');
