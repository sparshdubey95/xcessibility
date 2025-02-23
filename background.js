chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startSignLanguage") {
        fetch("http://localhost:5000/sign-language")
            .then(res => {
                if (!res.ok) throw new Error("Server error");
                return res.json();
            })
            .then(data => {
                // Send message to the active tab's content script to show alert
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    if (tabs[0]) {
                        chrome.tabs.sendMessage(tabs[0].id, { 
                            action: "showAlert", 
                            message: "Sign Translation: " + data.translation 
                        });
                    }
                });
            })
            .catch(err => console.error("Fetch error:", err));
    }
});
