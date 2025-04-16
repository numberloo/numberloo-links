function tryOpenApp(questionId) {
    // Check if we're on dev domain
    const isDev = window.location.hostname === 'dev.numberloo.com';
    const appUrl = `numberloo://question/${questionId}`;
    const playStoreUrl = isDev 
        ? 'https://play.google.com/store/apps/details?id=com.numberloo.dev'
        : 'https://play.google.com/store/apps/details?id=com.numberloo';
    
    // Detect Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isAndroid) {
        // Get timestamp
        const startTime = Date.now();
        
        // Try to open app
        window.location.href = appUrl;
        
        // Check after 500ms
        setTimeout(function() {
            // If page is still visible (app didn't open)
            if (document.hidden || document.webkitHidden) {
                return;
            }
            
            // If less than 500ms passed, app is probably not installed
            if (Date.now() - startTime < 500) {
                window.location.href = playStoreUrl;
            }
        }, 500);
    } else {
        // If not Android, stay on web page
        const webUrl = isDev
            ? `https://dev.numberloo.com/question/${questionId}`
            : `https://numberloo.com/question/${questionId}`;
        window.location.href = webUrl;
    }
} 
