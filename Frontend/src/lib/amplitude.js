// Frontend/src/lib/amplitude.js
import * as amplitude from '@amplitude/unified';

// Use VITE_AMPLITUDE_API_KEY for Vite compatibility
const API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY || process.env.REACT_APP_AMPLITUDE_API_KEY;
let initialized = false;

/**
 * Initialize Amplitude for anonymous analytics
 * - Tracks city, country, region via IP
 * - No user IDs or emails
 * - No session replay
 * - No autocapture (only manual events)
 */
export function initAmplitude() {
    if (typeof window === 'undefined' || initialized) return;
    
    const finalKey = API_KEY; 

    if (!finalKey) {
        console.warn('Amplitude API key missing. Check your .env file (VITE_AMPLITUDE_API_KEY).');
        return;
    }

    amplitude.initAll(finalKey, {
        analytics: {
            autocapture: false, // Disable automatic event tracking
            trackingOptions: {
                ip_address: true,  // Enable IP-based location
                city: true,
                country: true,
                region: true,
                dma: false,        // Not needed unless you target US audiences
            },
        },
        sessionReplay: {
            sampleRate: 0, // Disable session replay
        },
    });

    // Ensure any previous user data is cleared (anonymous mode)
    amplitude.reset();

    initialized = true;
    console.log('Amplitude initialized');
}

/** Track custom events manually */
export const trackEvent = (eventName, eventProperties = {}) => {
    // Ensure initialization occurs if calling trackEvent directly, though App.jsx should handle it.
    if (!initialized) initAmplitude();
    amplitude.track(eventName, eventProperties);
};

export default amplitude;