document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startAudio").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "START_RECORDING", audio: true });
  });

  document.getElementById("startSilent").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "START_RECORDING", audio: false });
  });

  document.getElementById("stopBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "STOP_RECORDING" });
  });

  document.getElementById("cancelBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "CANCEL_RECORDING" });
  });
});
