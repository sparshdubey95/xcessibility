// Confirm that the content script is loaded
console.log("Content script loaded for Xcessibility");

// Text-to-Speech Feature
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "textToSpeech") {
    let text = window.getSelection().toString();
    if (text) {
      let utterance = new SpeechSynthesisUtterance(text);
      if (message.voice) {
        const voices = speechSynthesis.getVoices();
        let selectedVoice = voices.find(v => v.name === message.voice);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }
      speechSynthesis.speak(utterance);
    } else {
      alert("Please select text to read aloud.");
    }
  }
});

// Display Sign Language Translation Modal with AI Avatar and Sign Images
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showSignLanguage") {
    console.log("Received sign language data in content script:", message);
    let modal = document.getElementById("xcessibility-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "xcessibility-modal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.6)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "9999";
      document.body.appendChild(modal);
    }
    // Create a content container
    let content = document.createElement("div");
    content.style.background = "#fff";
    content.style.padding = "20px";
    content.style.borderRadius = "10px";
    content.style.textAlign = "center";
    
    // Build HTML for sign images
    let imagesHTML = "";
    if (message.translation_images && message.translation_images.length > 0) {
      message.translation_images.forEach(url => {
        imagesHTML += `<img src="${url}" alt="Sign image" style="margin: 5px; max-width:80px; height:auto; border:1px solid #ccc; border-radius:5px;">`;
      });
    }
    
    content.innerHTML = `<h2>Sign Language Translation</h2>
                         <div>${imagesHTML}</div>
                         <br/>
                         <h3>AI Avatar</h3>
                         <img src="${message.avatar_url}" alt="AI Avatar" style="max-width: 150px; height: auto; border-radius: 10px;"/>
                         <br/><br/>
                         <button id="closeModal" style="padding: 10px 20px; background: #0078d7; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Close</button>`;
    modal.innerHTML = "";
    modal.appendChild(content);
    document.getElementById("closeModal").addEventListener("click", () => {
      modal.style.display = "none";
    });
    modal.style.display = "flex";
  }
});
