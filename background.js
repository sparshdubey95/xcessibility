chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startSignLanguage") {
    // If a specific text is needed, you can modify the URL to include a query parameter, e.g., "?text=Hello+world"
    let textToTranslate = message.text || "hello world";
    fetch(`http://localhost:5000/sign-language?text=${encodeURIComponent(textToTranslate)}`)
      .then(res => {
        if (!res.ok) throw new Error("Server error: " + res.status);
        return res.json();
      })
      .then(data => {
        console.log("Fetched sign language data:", data);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { 
              action: "showSignLanguage", 
              translation_images: data.translation_images,
              avatar_url: data.avatar_url
            }, function(response) {
              if (chrome.runtime.lastError) {
                console.error("Send message error:", chrome.runtime.lastError.message);
              }
            });
          } else {
            console.error("No active tab found.");
          }
        });
      })
      .catch(err => console.error("Fetch error:", err));
  }
});
