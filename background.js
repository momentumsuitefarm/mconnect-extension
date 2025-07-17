chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_RECORDING") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) {
        console.warn("❌ Aktif sekme bulunamadı.");
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["recorder.js"]
      });
    });
  }

  if (message.type === "STOP_RECORDING") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) {
        console.warn("❌ Aktif sekme bulunamadı.");
        return;
      }
      chrome.tabs.sendMessage(tabs[0].id, { type: "STOP_RECORDING" });
    });
  }
});
