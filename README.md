# Xcessibility

![Cover Photo](cover_photo.png)

**Xcessibility** is a Chrome extension that provides AI-powered accessibility tools for differently abled people. By integrating text-to-speech, sign language translation with an AI avatar, and a voice assistant that mimics Google Assistant, this project aims to create a more inclusive browsing experience.

## Description

In today's digital era, ensuring equal access to information is critical. Xcessibility leverages modern AI and machine learning technologies to offer:
- **Text-to-Speech:** Highlight text to have it read aloud, with customizable voices.
- **Sign Language Translation:** Convert sign language gestures into text, paired with an AI avatar that demonstrates the translation.
- **Voice Assistant:** Interact using voice commands in a conversational interface, similar to Google Assistant.

These features work together to empower differently abled people and enhance their web experience.

## Features

- **Customizable Text-to-Speech:**  
  Choose from available voices to customize how text is read aloud.

- **Sign Language Translation & AI Avatar:**  
  Uses integrated AI (with inspiration from [sign-language-translator](https://github.com/sign-language-translator/sign-language-translator) and [Air_canvas](https://github.com/sahaj162/Air_canvas/blob/main/air_canvas_ml.py#L2)) to translate sign language and display an AI avatar demonstration.

- **Voice Assistant Chat:**  
  Speak commands and interact with an AI-powered assistant using a conversational interface that displays both user input and AI responses.

## Installation

### Chrome Extension Setup

1. Clone or download this repository.
2. Navigate to the `Xcessibility` folder.
3. Open Chrome and go to: `chrome://extensions/`
4. Enable **Developer Mode**.
5. Click **Load unpacked** and select the `Xcessibility` folder.
6. The extension icon will appear in your browser toolbar.

### Python Backend Setup

1. Open a terminal and navigate to the `Xcessibility/server` folder.
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
