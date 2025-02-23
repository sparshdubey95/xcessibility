// Populate the voice dropdown
function populateVoiceList() {
  let voices = speechSynthesis.getVoices();
  let voiceSelect = document.getElementById('voiceSelect');
  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    let option = document.createElement('option');
    option.value = voice.name;
    option.textContent = voice.name + (voice.default ? ' (default)' : '');
    voiceSelect.appendChild(option);
  });
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Text-to-Speech Button
document.getElementById("tts-btn").addEventListener("click", () => {
  let voiceSelect = document.getElementById('voiceSelect');
  let selectedVoice = voiceSelect.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "textToSpeech", voice: selectedVoice });
  });
});

// Sign Language Translator Button
document.getElementById("sign-lang-btn").addEventListener("click", () => {
  // Optionally, you can prompt for custom text or use a default string.
  let customText = prompt("Enter text to translate to sign language:", "hello world");
  chrome.runtime.sendMessage({ action: "startSignLanguage", text: customText });
});

// Voice Assistant Feature with conversation bubbles
document.getElementById("voice-assist-btn").addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Speech recognition is not supported by your browser.');
    return;
  }
  let conversationDiv = document.getElementById("conversation");
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.start();

  recognition.onresult = (event) => {
    let command = event.results[0][0].transcript;
    console.log('Voice command recognized:', command);
    
    // Append user's command as a chat bubble
    let userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user";
    userBubble.textContent = command;
    conversationDiv.appendChild(userBubble);
    
    // Send command to backend for AI response
    fetch("http://localhost:5000/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: command })
    })
      .then(res => res.json())
      .then(data => {
        let aiBubble = document.createElement("div");
        aiBubble.className = "chat-bubble ai";
        aiBubble.textContent = data.response;
        conversationDiv.appendChild(aiBubble);
      })
      .catch(err => {
        console.error("Voice fetch error:", err);
        let errorBubble = document.createElement("div");
        errorBubble.className = "chat-bubble error";
        errorBubble.textContent = "Error: " + err;
        conversationDiv.appendChild(errorBubble);
      });
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    if (event.error === "not-allowed") {
      alert("Microphone access is blocked. Please enable microphone permissions for this extension.");
    } else {
      alert("Error during speech recognition: " + event.error);
    }
  };

  recognition.onabort = (event) => {
    console.error('Speech recognition aborted:', event);
    alert("Speech recognition was aborted. Please try again.");
  };

  recognition.onend = () => {
    console.log('Speech recognition service disconnected');
  };
});
