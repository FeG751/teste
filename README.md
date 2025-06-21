# 7Chat - Firebase Configuration

## Configurando o Firebase

Para usar este aplicativo de chat, você precisa configurar o Firebase com seu próprio projeto.

### Passo 1: Criar um Projeto Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Clique em "Criar um projeto" ou selecione um projeto existente
3. Siga as instruções para configurar seu projeto

### Passo 2: Adicionar um App Web

1. No painel do seu projeto, clique no ícone da web (</>)
2. Registre seu app com um nome (ex: "7Chat")
3. **NÃO** configure o Firebase Hosting por enquanto (pode fazer depois se quiser)
4. Copie a configuração do Firebase que aparece

### Passo 3: Configurar o Aplicativo

1. Abra o arquivo `firebase-config.js`
2. Substitua os valores placeholder pelas suas configurações reais:

```javascript
const firebaseConfig = {
    apiKey: "sua-api-key-aqui",
    authDomain: "seu-projeto-id.firebaseapp.com", 
    databaseURL: "https://seu-projeto-id-default-rtdb.firebaseio.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto-id.firebasestorage.app",
    messagingSenderId: "seu-messaging-sender-id",
    appId: "seu-app-id"
};
```

### Passo 4: Configurar Serviços do Firebase

1. **Authentication**: Vá em Authentication > Sign-in method e ative:
   - Email/Password
   - Anonymous (opcional, para usuários convidados)

2. **Firestore Database**: Vá em Firestore Database e crie um banco de dados
   - Comece em modo de teste (você pode ajustar as regras depois)

3. **Realtime Database** (opcional): Se você planeja usar recursos de tempo real

### Passo 5: Testar a Configuração

1. Abra o aplicativo no navegador
2. Se a configuração estiver correta, você verá a tela de login
3. Se houver erros, verifique o console do navegador para detalhes

## Solução de Problemas

### Erro: "Configuração do Firebase inválida"
- Verifique se você substituiu todos os valores placeholder no `firebase-config.js`
- Confirme que copiou a configuração corretamente do Console do Firebase

### Erro: "API key not valid"
- Sua API key pode estar incorreta
- Verifique se o projeto Firebase está ativo

### Erro: "Firebase project not found"
- Verifique se o `projectId` está correto
- Confirme que o projeto existe no Console do Firebase

## Recursos Adicionais

- [Documentação do Firebase](https://firebase.google.com/docs)
- [Guia de Configuração Web](https://firebase.google.com/docs/web/setup)
- [Console do Firebase](https://console.firebase.google.com/)

## Segurança

**Importante**: As chaves de API do Firebase para aplicações web são seguras para serem expostas publicamente, pois a segurança é controlada pelas regras do Firestore e Authentication. No entanto, sempre configure suas regras de segurança adequadamente no Console do Firebase.