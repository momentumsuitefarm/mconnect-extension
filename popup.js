document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "START_RECORDING" });
  });

  document.getElementById("stopBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "STOP_RECORDING" });
  });
});
