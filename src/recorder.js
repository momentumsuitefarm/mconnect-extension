let mediaRecorder;
let recordedChunks = [];
let stream;

async function startRecording(audio = false) {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: audio });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      if (recordedChunks.length === 0) return;

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
    console.log("🎬 Kayıt başladı (audio: " + audio + ")");
  } catch (err) {
    console.error("❌ Kayıt başlatılamadı:", err);
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "CONFIGURE_RECORDING") {
    startRecording(msg.audio);
  }

  if (msg.type === "STOP_RECORDING" && mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    stream.getTracks().forEach(track => track.stop());
    console.log("⏹️ Kayıt durduruldu");
  }

  if (msg.type === "CANCEL_RECORDING") {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    recordedChunks = []; // Kayıtları sil
    console.log("❌ Kayıt iptal edildi");
  }
});
