document.getElementById("tts-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "textToSpeech" });
    });
});

document.getElementById("sign-lang-btn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "startSignLanguage" });
});

document.getElementById("voice-assist-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "startVoiceAssistant" });
    });
});
