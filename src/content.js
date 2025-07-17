// === content.js ===

// Yayın yapan elementleri bul (video, canvas, yaygın kullanılan div class'ları)
function detectStreamingElement() {
    const video = document.querySelector("video");
    if (video) return video;

    const canvas = document.querySelector("canvas");
    if (canvas) return canvas;

    // Belirli class veya id'ye sahip div (örnek: .stream-container)
    const customDiv = document.querySelector("div[class*='stream'], div[id*='stream']");
    if (customDiv) return customDiv;

    return null;
}

// Tespit edilen elemente border koy, background'a bilgi gönder
const streamElement = detectStreamingElement();
if (streamElement) {
    streamElement.style.border = "2px dashed red";
    chrome.runtime.sendMessage({ type: "STREAM_ELEMENT_FOUND" });
} else {
    chrome.runtime.sendMessage({ type: "STREAM_ELEMENT_NOT_FOUND" });
}
