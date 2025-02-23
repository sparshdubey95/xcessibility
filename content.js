// Text-to-Speech Feature
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "textToSpeech") {
        let text = window.getSelection().toString();
        if (text) {
            let speech = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(speech);
        } else {
            alert("Select text to read.");
        }
    }
});

// Voice Assistant Feature using Speech Recognition
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startVoiceAssistant") {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = (event) => {
            let command = event.results[0][0].transcript;
            fetch("http://localhost:5000/voice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: command })
            })
            .then(res => res.json())
            .then(data => alert("AI Response: " + data.response))
            .catch(err => console.error("Voice fetch error:", err));
        };
    }
});

// Listen for messages from the background (to display alerts)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showAlert") {
        alert(message.message);
    }
});
