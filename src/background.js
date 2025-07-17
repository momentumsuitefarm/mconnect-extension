let isRecording = false;
let recordingAudio = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_RECORDING") {
    isRecording = true;
    recordingAudio = message.audio;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["src/recorder.js"]
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "CONFIGURE_RECORDING", audio: message.audio });
        sendResponse({ started: true });
      });
    });

    return true;
  }

  if (message.type === "GET_STATUS") {
    sendResponse({ isRecording, recordingAudio });
    return true;
  }

  if (["STOP_RECORDING", "RESUME_RECORDING", "FINISH_RECORDING", "CANCEL_RECORDING"].includes(message.type)) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, { type: message.type });
    });

    if (["CANCEL_RECORDING", "FINISH_RECORDING"].includes(message.type)) {
      isRecording = false;
    }

    sendResponse({ ok: true });
    return true;
  }
});
