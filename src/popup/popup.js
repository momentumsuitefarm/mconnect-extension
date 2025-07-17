document.addEventListener("DOMContentLoaded", () => {
  const recordBtn = document.getElementById("recordBtn");
  const modeButtons = document.getElementById("modeButtons");
  const controlButtons = document.getElementById("controlButtons");

  const startAudio = document.getElementById("startAudio");
  const startSilent = document.getElementById("startSilent");
  const pauseBtn = document.getElementById("pauseBtn");
  const resumeBtn = document.getElementById("resumeBtn");
  const finishBtn = document.getElementById("finishBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  chrome.runtime.sendMessage({ type: "GET_STATUS" }, (res) => {
    if (res?.isRecording) {
      showControls();
    } else {
      showInitial();
    }
  });

  recordBtn.addEventListener("click", () => {
    recordBtn.classList.add("hidden");
    modeButtons.classList.remove("hidden");
  });

  startAudio.addEventListener("click", () => {
    sendMessage({ type: "START_RECORDING", audio: true });
    showControls();
  });

  startSilent.addEventListener("click", () => {
    sendMessage({ type: "START_RECORDING", audio: false });
    showControls();
  });

  pauseBtn.addEventListener("click", () => {
    sendMessage({ type: "STOP_RECORDING" });
    pauseBtn.classList.add("hidden");
    resumeBtn.classList.remove("hidden");
  });

  resumeBtn.addEventListener("click", () => {
    sendMessage({ type: "RESUME_RECORDING" });
    resumeBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  });

  finishBtn.addEventListener("click", () => {
    sendMessage({ type: "FINISH_RECORDING" });
    showInitial();
  });

  cancelBtn.addEventListener("click", () => {
    sendMessage({ type: "CANCEL_RECORDING" });
    showInitial();
  });

  function sendMessage(msg) {
    chrome.runtime.sendMessage(msg, () => {
      if (chrome.runtime.lastError) {
        console.warn("❌ Mesaj hatası:", chrome.runtime.lastError.message);
      }
    });
  }

  function showInitial() {
    recordBtn.classList.remove("hidden");
    modeButtons.classList.add("hidden");
    controlButtons.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    resumeBtn.classList.add("hidden");
  }

  function showControls() {
    recordBtn.classList.add("hidden");
    modeButtons.classList.add("hidden");
    controlButtons.classList.remove("hidden");
    pauseBtn.classList.remove("hidden");
    resumeBtn.classList.add("hidden");
  }
});
