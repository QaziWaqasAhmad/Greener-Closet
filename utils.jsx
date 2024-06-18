// utils/detectMobile.js
export function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Checks for Android, iOS, Windows Phone
    return /android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) || /windows phone/i.test(userAgent);
}
