chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_RECORDING") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) return;
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["recorder.js"]
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "CONFIGURE_RECORDING", audio: message.audio });
      });
    });
  }

  if (message.type === "STOP_RECORDING") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, { type: "STOP_RECORDING" });
    });
  }

  if (message.type === "CANCEL_RECORDING") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, { type: "CANCEL_RECORDING" });
    });
  }
});
