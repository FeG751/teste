// Importa os scripts do Firebase (necessário para service workers)
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Importa a configuração do Firebase
importScripts('firebase-config.js');

// =========================================================================================
// CONFIGURAÇÃO DO SEU PROJETO FIREBASE
// =========================================================================================
// A configuração é agora carregada de firebase-config.js

// Validar configuração antes de inicializar
const configValidation = validateFirebaseConfig(firebaseConfig);

if (!configValidation.valid) {
    console.error('[firebase-messaging-sw.js] Configuração do Firebase inválida:', configValidation.error);
    console.error('[firebase-messaging-sw.js] Push notifications não funcionarão até que a configuração seja corrigida.');
} else {
    console.log('[firebase-messaging-sw.js] Configuração do Firebase válida, inicializando...');
    
    try {
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
        
        console.log('[firebase-messaging-sw.js] Firebase messaging inicializado com sucesso.');
    } catch (error) {
        console.error('[firebase-messaging-sw.js] Erro ao inicializar Firebase:', error);
    }
}

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
