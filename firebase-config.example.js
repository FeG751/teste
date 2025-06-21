// Firebase Configuration Example
// This is an example of how your firebase-config.js should look like
// Copy this file to firebase-config.js and replace the values with your actual Firebase configuration

const firebaseConfig = {
    // Example configuration (replace with your actual values)
    apiKey: "AIzaSyBvOxlJk4S1QKnkxkFdQHt8Kj3mCpK5xYz",
    authDomain: "meu-chat-app-12345.firebaseapp.com", 
    databaseURL: "https://meu-chat-app-12345-default-rtdb.firebaseio.com",
    projectId: "meu-chat-app-12345",
    storageBucket: "meu-chat-app-12345.firebasestorage.app",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789012abcd"
};

// Configuration validation
function validateFirebaseConfig(config) {
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const placeholderValues = [
        'AIzaSyCyidXzqqe-rrcF0QrBQ2iSIR_mf0tpMd0',
        'YOUR_API_KEY_HERE',
        'seu-projeto-chat.firebaseapp.com',
        'YOUR_PROJECT_ID.firebaseapp.com',
        'seu-projeto-chat',
        'YOUR_PROJECT_ID'
    ];
    
    // Check for missing fields
    for (const field of requiredFields) {
        if (!config[field] || config[field].trim() === '') {
            return {
                valid: false,
                error: `Missing required field: ${field}`
            };
        }
    }
    
    // Check for placeholder values
    for (const field of requiredFields) {
        if (placeholderValues.includes(config[field])) {
            return {
                valid: false,
                error: `Placeholder value detected for ${field}. Please replace with actual Firebase configuration.`
            };
        }
    }
    
    // Check for suspicious patterns
    if (config.authDomain.includes('seu-projeto-chat') || 
        config.projectId.includes('seu-projeto-chat') ||
        config.storageBucket.includes('seu-projeto-chat')) {
        return {
            valid: false,
            error: 'Firebase configuration contains example/placeholder values. Please replace with your actual Firebase project configuration.'
        };
    }
    
    return { valid: true };
}

// Export configuration and validation
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = { firebaseConfig, validateFirebaseConfig };
} else {
    // Browser environment
    window.firebaseConfig = firebaseConfig;
    window.validateFirebaseConfig = validateFirebaseConfig;
}