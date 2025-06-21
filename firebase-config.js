// Firebase Configuration
// Replace the values below with your actual Firebase project configuration
// You can find these values in your Firebase Console > Project Settings > General > Your apps

const firebaseConfig = {
    // Replace with your actual Firebase project configuration
    // Get these values from: Firebase Console > Project Settings > General > Your apps
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com", 
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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