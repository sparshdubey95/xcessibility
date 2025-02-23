from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Ensure you replace this with your actual Gemini API key
GEMINI_API_KEY = "AIzaSyBpy-5a_V4wDsbfTI8XmZfLj7EEVgpvwww"

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/voice', methods=['POST'])
def voice_assistant():
    user_text = request.json.get("text", "")
    app.logger.debug("Received voice text: %s", user_text)
    try:
        # Call the Gemini API endpoint (ensure the endpoint is correct)
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
            json={"prompt": {"text": user_text}},
            params={"key": GEMINI_API_KEY}
        )
        app.logger.debug("Gemini API status code: %s", response.status_code)
        response.raise_for_status()
        data = response.json()
        app.logger.debug("Gemini API response data: %s", data)

        # Check if the response structure contains candidates
        if "candidates" in data and len(data["candidates"]) > 0:
            ai_response = data["candidates"][0].get("text", "No text returned.")
            return jsonify({"response": ai_response})
        else:
            app.logger.error("No valid candidates in API response")
            return jsonify({"response": "No valid response from AI service."})
    except Exception as e:
        app.logger.exception("Error processing voice request")
        return jsonify({"response": "Error processing request: " + str(e)}), 500

@app.route('/sign-language', methods=['GET'])
def sign_language():
    # This is a placeholder. Replace with integration to your sign language translator API.
    return jsonify({"translation": "Hello (in sign language)"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
