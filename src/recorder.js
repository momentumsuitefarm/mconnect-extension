(() => {
  if (window.recorderInjected) return;
  window.recorderInjected = true;

  let mediaRecorder = null;
  let recordedChunks = [];
  let stream = null;

  async function startRecording(audio = false) {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      let finalStream = displayStream;

      if (audio) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          finalStream = new MediaStream([...displayStream.getTracks(), ...micStream.getAudioTracks()]);
        } catch {
          alert("🔇 Mikrofon erişimi reddedildi. Ses kaydı olmadan devam ediliyor.");
        }
      }

      mediaRecorder = new MediaRecorder(finalStream);
      stream = finalStream;

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
    } catch (err) {
      alert("Kayıt başlatılamadı: " + err.message);
    }
  }

  function stopTracks() {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      stream = null;
    }
  }

  chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.type) {
      case "CONFIGURE_RECORDING":
        startRecording(msg.audio);
        break;

      case "STOP_RECORDING":
        if (mediaRecorder?.state === "recording") mediaRecorder.pause();
        break;

      case "RESUME_RECORDING":
        if (mediaRecorder?.state === "paused") mediaRecorder.resume();
        break;

      case "FINISH_RECORDING":
        if (mediaRecorder) mediaRecorder.stop();
        stopTracks();
        break;

      case "CANCEL_RECORDING":
        if (mediaRecorder) mediaRecorder.stop();
        stopTracks();
        recordedChunks = [];
        break;
    }
  });
})();
