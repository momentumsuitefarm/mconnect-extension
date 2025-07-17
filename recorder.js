// === recorder.js ===

let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "mconnect_recording.webm";
            a.click();

            URL.revokeObjectURL(url);
            recordedChunks = [];
        };

        mediaRecorder.start();
        console.log("🎬 Kayıt başladı");
    } catch (err) {
        console.error("❌ Kayıt başlatılamadı:", err);
    }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "STOP_RECORDING" && mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("⏹️ Kayıt durduruldu");
    }
});

startRecording();