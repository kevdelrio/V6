// Augment the window interface
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: { [key: string]: any }) => void;
  }
}

export const PHONE_CONVERSION_LABEL = 'AW-YOUR_CONVERSION_ID/YOUR_PHONE_LABEL';
export const FORM_CONVERSION_LABEL = 'AW-YOUR_CONVERSION_ID/YOUR_FORM_LABEL';
export const BOOKING_CONVERSION_LABEL = 'AW-YOUR_CONVERSION_ID/YOUR_BOOKING_LABEL';

export const reportConversion = (label: string, callback?: () => void) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      'send_to': label,
      'event_callback': callback
    });
  } else {
    console.warn('Google Ads gtag.js not loaded.');
  }
};
